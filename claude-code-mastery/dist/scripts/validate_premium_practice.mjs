import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const practice = read('data/premium-practice.json');
const topics = read('data/topic-details.json');
const sources = read('data/source-manifest.json');
const curriculum = read('data/curriculum-map.json');
const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

assert(practice.schemaVersion === '1.0', 'Unexpected premium-practice schema version.');
assert(Array.isArray(practice.projects) && practice.projects.length === 8, 'Exactly eight serious projects are required.');

const topicIds = new Set(topics.map(topic => topic.id));
const sourceIds = new Set(sources.map(source => source.id));
const curriculumIds = curriculum.phases.flatMap(phase => phase.groups.flatMap(group => group.topicIds));
const projectIds = practice.projects.map(project => project.id);
const projectIdSet = new Set(projectIds);
assert(projectIdSet.size === projectIds.length, 'Project IDs must be unique.');

const assignedTopics = [];
practice.projects.forEach((project, index) => {
  assert(project.order === index + 1, `${project.id}: order must match cumulative sequence.`);
  assert(project.title && project.objective && project.professionalScenario, `${project.id}: missing core project description.`);
  assert(project.primaryTopicIds?.length, `${project.id}: missing primaryTopicIds.`);
  assert(project.evidenceSourceIds?.length, `${project.id}: missing evidenceSourceIds.`);
  assert(project.deliverables?.length >= 4, `${project.id}: needs at least four professional deliverables.`);
  assert(project.guidedLabs?.length >= 3, `${project.id}: needs at least three guided labs.`);
  assert(project.independentAssignment?.brief && project.independentAssignment?.submission, `${project.id}: incomplete independent assignment.`);
  assert(project.rubric?.length >= 4, `${project.id}: rubric needs at least four criteria.`);
  assert(project.rubric?.reduce((sum, item) => sum + item.weight, 0) === 100, `${project.id}: rubric weights must sum to 100.`);
  assert(project.modelSolutionOutline?.length >= 5, `${project.id}: model-solution outline is too short.`);
  assert(project.professionalChecklist?.length >= 7, `${project.id}: professional checklist is too short.`);
  assert(project.masteryGate, `${project.id}: missing mastery gate.`);
  project.primaryTopicIds.forEach(id => {
    assignedTopics.push(id);
    assert(topicIds.has(id), `${project.id}: unknown topic ${id}.`);
  });
  project.evidenceSourceIds.forEach(id => assert(sourceIds.has(id), `${project.id}: unknown source ${id}.`));
  project.prerequisiteProjectIds.forEach(id => {
    assert(projectIdSet.has(id), `${project.id}: unknown prerequisite project ${id}.`);
    assert(projectIds.indexOf(id) < index, `${project.id}: prerequisite ${id} must occur earlier.`);
  });
  const labIds = project.guidedLabs.map(lab => lab.id);
  assert(new Set(labIds).size === labIds.length, `${project.id}: guided lab IDs must be unique within project.`);
  project.guidedLabs.forEach(lab => {
    assert(lab.steps?.length >= 4, `${project.id}/${lab.id}: lab needs at least four steps.`);
    assert(lab.proof, `${project.id}/${lab.id}: lab needs direct proof.`);
  });
});

const duplicateTopics = assignedTopics.filter((id, index) => assignedTopics.indexOf(id) !== index);
const missingTopics = [...topicIds].filter(id => !assignedTopics.includes(id));
const extraTopics = assignedTopics.filter(id => !topicIds.has(id));
assert(assignedTopics.length === 95, `Expected 95 primary topic assignments, found ${assignedTopics.length}.`);
assert(new Set(assignedTopics).size === 95, `Primary topics must be unique; duplicates: ${[...new Set(duplicateTopics)].join(', ')}`);
assert(missingTopics.length === 0, `Topics missing from projects: ${missingTopics.join(', ')}`);
assert(extraTopics.length === 0, `Unknown topics in projects: ${extraTopics.join(', ')}`);
assert(curriculumIds.length === 95 && new Set(curriculumIds).size === 95, 'Curriculum map must contain 95 unique topics.');
assert([...topicIds].every(id => curriculumIds.includes(id)), 'Project topics and curriculum-map topics must describe the same set.');

const stages = practice.capstoneProgression || [];
assert(stages.length === 8, 'Capstone progression must contain eight stages.');
assert(stages.every((stage, index) => stage.stage === index + 1 && stage.projectId === projectIds[index]), 'Capstone stages must follow project order exactly.');
assert(practice.professionalChecklists?.length >= 4, 'At least four cross-project professional checklists are required.');

if (errors.length) {
  console.error(`Premium practice validation failed (${errors.length}):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(JSON.stringify({
  projects: practice.projects.length,
  guidedLabs: practice.projects.reduce((sum, project) => sum + project.guidedLabs.length, 0),
  primaryTopicAssignments: assignedTopics.length,
  uniqueTopics: new Set(assignedTopics).size,
  rubricWeightChecks: practice.projects.length,
  capstoneStages: stages.length,
  professionalChecklists: practice.professionalChecklists.length,
  status: 'passed'
}, null, 2));

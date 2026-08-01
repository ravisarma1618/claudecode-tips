# Premium-course quality rubric

Passing a structural depth check does not make a lesson publishable. A premium lesson must teach its named mechanism with source-grounded language, a reproducible application, and evidence a learner can judge independently.

## Mandatory editorial gates

1. **Distinct teaching:** the explanation must not be a title inserted into prose reused across the course. Repeated sentences, shared generic contrasts, identical mastery criteria, and high cross-topic similarity fail.
2. **Mechanism fidelity:** the mechanism and application must use the topic's distinctive source vocabulary and explain a causal relationship—not merely say that the topic improves decisions or leaves evidence.
3. **Realistic application:** a worked example names a credible actor/task, concrete starting state, actions that exercise the named concept, a boundary case, and an inspectable result. “A practitioner,” “one named change,” or bracket-only examples fail.
4. **Executable artifacts:** procedural engineering lessons include the relevant command, file/path, configuration key, state artifact, prompt fragment, or interface action. They also name the expected output: test result, diff, log field, exit status, generated file, permission denial, trace, or other direct evidence.
5. **Diagnostic recovery:** failures are topic-specific. Symptoms distinguish likely causes and each recovery changes the failed layer. Generic “inspect the files and retry” advice fails.
6. **Practical mastery rubric:** success criteria are observable and specific to the exercise. Course-wide boilerplate such as “a new reader understands it” is not a grading rubric.
7. **Traceable evidence:** every source-derived mechanism has a valid supplied-source page citation. Citation support says what that page supports; “source evidence for this topic” fails.
8. **Evidence boundaries:** source-supported statements, instructor-authored examples, synthesis, inference, and time-sensitive claims are labeled honestly.
9. **Visual accountability:** a used visual has a manifest record, existing asset, source ID, source page, descriptive alt text, explanatory caption, and visible attribution. If no visual is used, the reason addresses this topic rather than repeating a stock sentence.
10. **Progressive instruction:** beginner meaning, mechanism, procedure, application, recovery, practice, and advanced nuance add new information rather than restating the same control-loop metaphor.

## Automated safeguards

- At least four distinctive ontology/source terms must occur in the dossier, and at least two in the mechanism/application.
- No unresolved placeholders in a worked example. Reusable templates may contain placeholders only when usage guidance explains them.
- Procedural repository/tool/delivery/automation lessons must contain a command-or-file artifact and a named output signal.
- Worked examples must not share a normalized scenario with another lesson.
- Shared boilerplate sentences appearing in ten or more dossiers are reported; six or more in one dossier fails.
- Identical success-criterion sets reused across five or more dossiers fail.
- Citation pages must exist in `pdf-reader.json`; support descriptions must be substantive.
- Visual files and manifest records must agree exactly.

Automated checks are rejection gates, not proof of excellence. A passing lesson still requires human source comparison, technical review, and learner testing.

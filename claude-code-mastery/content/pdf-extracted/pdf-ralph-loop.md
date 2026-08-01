# Claude Code Ralph Loop_ From Basic Prompts to Autonomous Overnight Builds

Source file: `C:\mycode\claude code tips\manual pdf\Claude Code Ralph Loop_ From Basic Prompts to Autonomous Overnight Builds.pdf`

## Page 1

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop: From Basic Prompts to
Autonomous Overnight Builds Claude Code Ralph Loop:
From Basic Prompts to…
The looping technique that turns Claude's biggest flaw into your unfair advantageSummarise this blog
JOE
APR 02, 2026
139 6 14 Share
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 1/56

## Page 2

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
First, welcome to all new subscribers. We have finally made it to 39,000+. I am very
grateful to each of you and am still overwhelmed by the support, pledges, and
encouragement you have sent — Thank you once again. Claude Code Ralph Loop:
From Basic Prompts to…
In the previous issue, I covered the CLAUDE.md masterclass and, in the
introduction to the masterclass series, mentioned the Deep Dive series, which
covers important non-core topics.
This issue brings you the first article in the Claude Code Deep Dive series — Claude
Code Ralph Loop Deep Dive
Thanks for reading Claude Code Masterclass!
Subscribe for free to receive new posts and
support my work.
ravisarma1618@gmail.com Subscribe
Every Claude Code session has the same hidden flaw; Claude stops when it thinks
the job is done.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 2/56

## Page 3

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Tests broken
API half-implemented,
Edge cases untouched Claude Code Ralph Loop:
From Basic Prompts to…
But it declares complete and exits. And the longer and more complex the task, the
worse it gets.
There is a technique designed to fix this problem. You have probably heard the
word “Ralph” thrown around.
It’s a simple idea that forces Claude to keep iterating until the work is genuinely
completed.
Surprisingly, this technique has been used to ship entire projects overnight at a
fraction of the actual cost.
In this newsletter, I’ll take you from understanding why Claude fails on
complex tasks to building the full Ralph Loop system and running it on real
projects.
We’ll cover the Ralph core mechanism, the PRD and memory architecture, and
everything you need to put Ralph Loop to work.
Let’s start with the basics.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 3/56

## Page 4

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
What is Ralph Loop?
Let me start with something that might surprise you. Claude Code Ralph Loop:
From Basic Prompts to…
Ralph Loop isn’t a framework, and it is not a sophisticated AI orchestration
system. At the core, it’s a Bash while loop.
while true; do
cat prompt.md | claude
done
The technique was created by Jeffrey Huntley
The name comes from Ralph Wiggum, arguably the dumbest character in The
Simpsons. Ralph fails constantly, making silly mistakes. But stubbornly continues
in an endless loop until he eventually succeeds.
This childlike persistence is the philosophy behind the technique.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 4/56

## Page 5

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
With Ralph Loop, Claude is no longer allowed to exit when it thinks it’s done.
It’s forced to keep working until the task is truly finished.
Claude Code Ralph Loop:
From Basic Prompts to…
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 5/56

## Page 6

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop:
From Basic Prompts to…
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 6/56

## Page 7

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
The key insight is that Ralph Loop treats failure as expected, not exceptional.
Claude Code Ralph Loop:
Each iteration builds on the last. The AI sees what it did before, recognizes what’sFrom Basic Prompts to…
still broken, and improves.
Why Claude Code Needs Ralph
Claude Code has a limitation that most developers don’t recognize until they’ve hit it
repeatedly.
It operates in single-pass mode.
Even though Claude reasons extremely well, it stops as soon as it believes the output is
“good enough.”
The model has what you might call an implicit execution budget. Once it feels
like it’s done reasonable work, it wraps up and exits.
The problem is that “ good enough”, according to Claude, often isn’t good enough.
I’ve seen this pattern dozens of times:
Claude builds a feature, declares it complete, but the edge cases are broken
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 7/56

## Page 8

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude writes tests, says they pass, but they don’t actually run
Claude implements an API, marks it done, but forgot error handling
Claude Code Ralph Loop:
It believes it’s finished, but it’s making that judgment based on what the code looksFrom Basic Prompts to…
like, not whether it works.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 8/56

## Page 9

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop:
From Basic Prompts to…
Another problem that makes this worse is the context rot.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 9/56

## Page 10

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
As the conversation with Claude gets longer, the context window fills up. The model’s
reasoning quality degrades as it has to juggle more information.
Claude Code Ralph Loop:
From Basic Prompts to…
Jeffrey Huntley calls this “compaction” — when the context gets summarized and
loses important details. The model starts forgetting things it knew earlier in the
conversation. It makes mistakes it wouldn’t have made with a fresh context.
This is why the single-pass approach fails for complex tasks.
By the time Claude reaches the end of a big feature, its context is bloated with
attempts, errors, and fixes. The quality of its reasoning has degraded.
Ralph Loop solves both problems:
1. Forces verification — Claude can’t exit until it proves the work is done
2. Fresh context — Each iteration starts clean, avoiding context rot
Core Mechanism
Let me break down how Ralph Loop works.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 10/56

## Page 11

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
The Anthropic plugin uses the stop hook. This is a feature in Claude Code that
runs whenever Claude finishes responding and tries to end the session.
Here’s the flow: Claude Code Ralph Loop:
From Basic Prompts to…
1. You give Ralph your prompt and a completion promise (like “DONE” or
“COMPLETE”)
2. Claude works on the task
3. Claude tries to exit
4. The stop hook intercepts the exit
5. It scans the output for the completion promise
6. If no promise is found, it feeds the same prompt back to Claude
7. Claude sees its previous work in the files and improves it
8. Repeat until the completion promise appears
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 11/56

## Page 12

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop:
From Basic Prompts to…
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 12/56

## Page 13

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop:
From Basic Prompts to…
The magic happens in those state files at the bottom.
prd.json — Contains your task list with passes: true/false flags. Claude reads this to
know what’s done and what’s left.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 13/56

## Page 14

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
progress.txt — Short-term memory. Claude appends learnings after each iteration.
The next iteration reads this to avoid repeating mistakes.
agents.md — Long-term memory. Patterns and knowledge that persist beyond theClaude Code Ralph Loop:
current sprint. From Basic Prompts to…
When Claude starts a new iteration, it reads these files and sees the code it wrote. It
sees what passed and what failed, and it sees notes from previous iterations.
This is what makes Ralph Loop more than just “run it again.” Each iteration is
informed by all previous iterations.
Completion Promise
The completion promise is how Ralph knows when to stop.
You define a specific word or phrase — typically “DONE” or “COMPLETE”. Claude
must output this wrapped in a specific format:
<promise>COMPLETE</promise>
The stop hook scans for this pattern. If it finds it, the loop exits. If not, the loop
continues.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 14/56

## Page 15

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
This creates a contract between you and Claude:
You define what “done” means (clear criteria in your prompt)
Claude Code Ralph Loop:
Claude works until those criteria are met From Basic Prompts to…
Claude signals completion with the promise
Ralph verifies and exits
The promise should represent actual completion. Your prompt needs to define what
must be true before Claude outputs the promise.
Bad prompt:
Build a todo API. Output COMPLETE when done.
Good prompt:
Build a REST API for todos.
Requirements:
- CRUD endpoints for todos
- Input validation
- Error handling
- Tests with 80% coverage
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 15/56

## Page 16

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Run tests after implementation.
Only output <promise>COMPLETE</promise> when ALL tests pass.
Claude Code Ralph Loop:
From Basic Prompts to…
The second prompt gives Claude binary criteria that can be verified.
What Ralph Loop Is NOT
Before we go deeper, let me clear up some misconceptions.
1. Ralph is not the Anthropic plugin.
The plugin is convenient, but it’s a simplified implementation. It doesn’t fully reset
context between iterations the way the original bash loop approach does. For simple
tasks, the plugin works fine. For complex projects, you’ll want the full approach.
2. Ralph is not magic.
It amplifies whatever you feed it. Good planning and clear criteria produce great
results. Vague prompts produce expensive loops that go nowhere.
3. Ralph is not a replacement for thinking.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 16/56

## Page 17

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
You still need to design your tasks, write clear criteria, and review the output. Ralph
automates the iteration cycle, not the engineering judgment.
4. Ralph is not always the right tool. Claude Code Ralph Loop:
From Basic Prompts to…
Some tasks need human judgment at every step. Some tasks are one-shot and simple.
Ralph is ideal for complex, multi-step work that has verifiable completion criteria.
Ralph Architecture
1) PRD (Product Requirements Document)
Everything starts with the PRD.
Before you run a single iteration, you need a clear definition of what you’re building.
The PRD is the definition that guides every Ralph Loop iteration.
Most developers get it wrong: they try to write the PRD themselves.
I don’t do that.
Generate it through a conversation with Claude.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 17/56

## Page 18

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Describe your idea, let Claude ask clarifying questions, then have it produce a
structured document. This approach is faster and often produces better resultsClaude Code Ralph Loop:
than writing from scratch. From Basic Prompts to…
Here's a PRD generator prompt you can use:
1 I want to build [DESCRIBE YOUR FEATURE/PROJECT].
2
3 Interview me about this. Ask 3-5 clarifying questions about:
4 - Target users
5 - Core functionality
6 - Technical requirements
7 - Success criteria
8
9 After I answer, generate a PRD with:
10 - Project overview
11 - User stories (who does what, why)
12 - Feature requirements
13 - Success criteria (binary, testable)
14 - Technical stack
15 - Out of scope (what we're NOT building)
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 18/56

## Page 19

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop:
From Basic Prompts to…
Key principle: Every success criterion must be binary and testable.
Not “the UI should look good” — that’s subjective. Instead: “the dashboard loads in under
2 seconds,” or “all buttons have hover states,” or “accessibility score is 90+.”
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 19/56

## Page 20

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
2) Task List (prd.json)
The PRD describes what you’re building. The task list breaks it into atomic pieces.
Claude Code Ralph Loop:
This is where Ralph Loop gets its power. From Basic Prompts to…
Instead of asking Claude to build an entire feature in one shot, you give it a
sequence of small, focused tasks. Each task completes in one iteration with a
fresh context.
The format follows Anthropic’s recommendation from their long-running agents
documentation:
1 {
2 "projectName": "Todo API",
3 "tasks": [
4 {
5 "id": "US-001",
6 "title": "Set up project structure",
7 "acceptanceCriteria": [
8 "package.json exists with dependencies",
9 "TypeScript configured",
10 "npm run build succeeds"
11 ],
12 "passes": false
13 },
14 {
15 "id": "US-002",
16 "title": "Create todo database schema",
17 "acceptanceCriteria": [
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 20/56

## Page 21

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
18 "todos table with id, title, completed, created_at",
19 "Migration runs successfully",
20 "Schema matches specification"
21 ],
22 "passes": false Claude Code Ralph Loop:
23 }, From Basic Prompts to…
24 {
25 "id": "US-003",
26 "title": "Implement GET /todos endpoint",
27 "acceptanceCriteria": [
28 "Returns array of todos",
29 "Supports pagination",
30 "Tests pass for endpoint"
31 ],
32 "passes": false
33 }
34 ]
35 }
The passes: false flag is crucial. As Ralph completes each task, it sets this to true.
The loop continues until all tasks pass.
Task sizing is critical. Each task must:
Complete in ONE iteration
Fit comfortably in the context window
Have verifiable acceptance criteria
Result in a working, committable change
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 21/56

## Page 22

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
If a task feels big, split it. “Build authentication” is too big. Split into: “Add
users table” → “Create signup endpoint” → “Create login endpoint” →
“Implement JWT tokens” → “Write auth tests.” Claude Code Ralph Loop:
From Basic Prompts to…
3) Memory System
Ralph Loop has memory, both short-term and long-term.
Short-term memory: progress.txt
This file tracks what happened during the current sprint.
After each iteration, Claude appends:
What was implemented
What files were changed
Any learnings or patterns discovered
Blockers encountered
The next iteration reads this file. It knows what the previous iteration did, what worked,
and what didn’t.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 22/56

## Page 23

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
1 ## Iteration 3 - 2024-01-15 14:32
2
3 **Task:** US-003 - Implement GET /todos endpoint
4 Claude Code Ralph Loop:
5 **Implemented:** From Basic Prompts to…
6 - Created routes/todos.ts
7 - Added GET /todos with pagination
8 - Added tests for endpoint
9
10 **Files Changed:**
11 - src/routes/todos.ts (new)
12 - src/routes/index.ts (updated)
13 - tests/todos.test.ts (new)
14
15 **Learnings:**
16 - Pagination requires offset and limit params
17 - Need to handle empty results case
18
19 **Next:** US-004 - POST endpoint
Long-term memory: agents.md
This is permanent knowledge. Things that should persist beyond the current sprint.
You can have agents.md files in any folder. Claude reads them when working in
that folder. They’re like sticky notes for future iterations (and future sprints)
1 # Project Patterns
2
3 ## API Routes
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 23/56

## Page 24

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
4 - All routes use Express Router
5 - Validation middleware goes before handler
6 - Error responses follow { error: string, code: number } format
7
8 ## Testing Claude Code Ralph Loop:
9 - Use vitest, not jest From Basic Prompts to…
10 - Mock database with in-memory SQLite
11 - Each test file needs afterEach cleanup
12
13 ## Gotchas
14 - Don't use `any` type - breaks type checking
15 - Always await database operations
16 - Rate limiting middleware must be first
The memory system is why Ralph gets smarter over iterations instead of repeating
mistakes. Each iteration learns from the last.
4) Feedback Loop System
Without feedback loops, Ralph Loop is just expensive guessing.
Claude needs automated ways to verify its own work.
It can’t just look at code and decide it’s correct — it needs to run tests, check
types, and execute builds, which is the real verification.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 24/56

## Page 25

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop:
From Basic Prompts to…
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 25/56

## Page 26

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop:
From Basic Prompts to…
Build verification into every prompt:
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 26/56

## Page 27

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
1 After implementing:
2 1. Run `npm run typecheck` — fix any errors
3 2. Run `npm run lint` — fix any warnings
4 3. Run `npm test` — all tests must pass Claude Code Ralph Loop:
5 4. Run `npm run build` — must compile From Basic Prompts to…
6
7 Only mark task complete when ALL checks pass.
8 If any fail, debug and fix before continuing.
Feedback types and what they catch:
For backend work, types + tests + build are usually sufficient.
For frontend work, add browser automation. Claude can’t “see” a UI by reading
code. It needs to render pages and interact with elements to verify they work.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 27/56

## Page 28

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
The feedback loop creates self-correction. Claude writes code, runs checks, sees
failures, fixes them, runs checks again.
Claude Code Ralph Loop:
From Basic Prompts to…
Next, let’s move from architecture to execution, the progression from manual runs
to overnight autonomous operation.
Ralph Execution
There’s a right way and a wrong way to start using Ralph Loop.
The wrong way: install the plugin, fire off a complex prompt, go to sleep, wake
up to chaos.
The right way: progress through levels, building understanding at each stage.
Jeffrey Huntley, the creator of Ralph, puts it simply: “Don’t start with the
jackhammer. Learn the screwdriver first.”
The screwdriver is a manual single runs while the jackhammer is an overnight
autonomous operation.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 28/56

## Page 29

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
You need to master each level before moving to the next.
Claude Code Ralph Loop:
From Basic Prompts to…
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 29/56

## Page 30

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop:
From Basic Prompts to…
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 30/56

## Page 31

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop:
Each level teaches you something you can't learn at the next level. From Basic Prompts to…
Level 1: Manual Single Runs (The Screwdriver)
Start here with every new project.
At Level 1, you run one iteration at a time and watch everything.
You see what Claude does, what it gets right, what it gets wrong.
Run Level 1:
1 # Option 1: Direct command
2 cat prompt.md | claude
3
4 # Option 2: Using the plugin with max-iterations 1
5 /ralph-loop "your task" --completion-promise "DONE" --max-iterations 1
After each iteration:
Read the code Claude wrote
Check if it was committed properly
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 31/56

## Page 32

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Verify the prd.json was updated
Look at progress.txt entries
Run the tests yourself Claude Code Ralph Loop:
From Basic Prompts to…
Then run the next iteration.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 32/56

## Page 33

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop:
From Basic Prompts to…
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 33/56

## Page 34

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop:
From Basic Prompts to…
What you’re learning at Level 1:
How Claude interprets your prompts
What patterns does your codebase trigger?
Where Claude gets confused
How long does each iteration take?
What the token cost looks like
Whether your criteria are clear enough
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 34/56

## Page 35

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
This is important knowledge. You can’t debug overnight runs if you’ve never
watched a single iteration complete. Claude Code Ralph Loop:
From Basic Prompts to…
When to move to Level 2:
You’ve run 10+ manual iterations
You understand the flow completely
You can predict what Claude will do
You know what success looks like
You know what failure looks like
Level 2: Attended Loops (Power Drill)
At Level 2, you let Ralph run multiple iterations
1 /ralph-loop "your task" --completion-promise "DONE" --max-iterations 10
Every few iterations, you look at:
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 35/56

## Page 36

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Is it picking tasks in the right order?
Are commits happening after each task?
Is progress.txt being updated? Claude Code Ralph Loop:
From Basic Prompts to…
Are the tests actually passing?
Any strange patterns emerging?
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 36/56

## Page 37

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop:
From Basic Prompts to…
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 37/56

## Page 38

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop:
From Basic Prompts to…
The key at Level 2 is catching problems early.
If something’s going wrong at iteration 3, you want to know before iteration 15.
Pause, fix the issue (usually in the prompt or PRD), then resume.
What you’re learning at Level 2:
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 38/56

## Page 39

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
How the loop handles your specific codebase over time
What failure patterns look like in your setup
How quickly issues compound if not caught Claude Code Ralph Loop:
From Basic Prompts to…
What is your actual token cost per task
Whether your max-iterations is set appropriately
When to move to Level 3:
You’ve run 3-5 attended loops (50+ total iterations)
No surprises in the last 2-3 runs
You trust the setup
You know exactly what to check in the morning
You have a recovery plan if things go wrong
Level 3: Unattended Overnight (Jackhammer)
The goal is to set it running before bed, wake up to completed work.
But you only get here after mastering Levels 1 and 2.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 39/56

## Page 40

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop:
From Basic Prompts to…
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 40/56

## Page 41

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop:
From Basic Prompts to…
The overnight checklist:
Before starting an unattended run:
PRD is complete and reviewed
All tasks are atomic with clear criteria
Feedback loops built into prompt (tests, types, lint)
Max iterations set (30-50 for overnight)
Git branch is clean and ready
Notification system configured (optional but helpful)
You know what “success” looks like in the morning
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 41/56

## Page 42

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Morning review process:
1. Check prd.json — how many tasks passed?
Claude Code Ralph Loop:
2. Read progress.txt — any errors or blockers? From Basic Prompts to…
3. Review git log — are commits sensible?
4. Run tests manually — do they pass?
5. Test the feature yourself — does it work?
Expect 80-95% completion on a good run. Some edge cases always need human
attention.
The goal isn’t perfect code but 8 hours of work done while you slept, with 1-2
hours of cleanup in the morning.
Setting up notifications:
You can add a notification when Ralph completes:
1 # Simple approach: notify after loop exits
2 /ralph-loop "task" --max-iterations 30 --completion-promise "DONE" && \
3 notify-send "Ralph complete" || notify-send "Ralph failed"
Some developers set up WhatsApp or Slack notifications using simple scripts. Useful if
you want to check progress before morning.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 42/56

## Page 43

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Ralph Practical Examples
Claude Code Ralph Loop:
From Basic Prompts to…
Different projects need different approaches. Here are four patterns that work for
specific use cases.
Pattern 1: The Feature Builder
Building new features from a PRD
This is the classic Ralph Loop use case. You have a feature to build, you break it
into tasks, and Ralph builds it piece by piece.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 43/56

## Page 44

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop:
From Basic Prompts to…
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 44/56

## Page 45

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop:
From Basic Prompts to…
Prompt template:
1 You are an autonomous coding agent working on this project.
2
3 Your task:
4 1. Read prd.json to find the highest priority task where passes is false
5 2. Implement that single task
6 3. Run tests to verify: npm run typecheck && npm test && npm run build
7 4. If tests pass, update prd.json to set passes: true
8 5. Append progress to progress.txt
9 6. Commit your changes with a descriptive message
10
11 Only work on ONE task per iteration.
12
13 When ALL tasks in prd.json have passes: true, output <promise>COMPLETE</promise>
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 45/56

## Page 46

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Example project: REST API with 15 endpoints
Task 1-3: Project setup, database, basic structure
Claude Code Ralph Loop:
Task 4-10: Individual endpoints (one per task) From Basic Prompts to…
Task 11-13: Validation, error handling, edge cases
Task 14-15: Documentation, final tests
Expected: 15-20 iterations, 2-4 hours unattended
Pattern 2: Test-Until-Green
Improving test coverage on existing code
You have code that works but lacks tests. Ralph writes tests until coverage hits
your target.
Prompt template:
1 Your task: Improve test coverage for this codebase.
2
3 Current coverage: Check with `npm run coverage`
4 Target coverage: 80%
5
6 Process:
7 1. Run coverage report to identify untested code
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 46/56

## Page 47

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
8 2. Write tests for the most critical untested function
9 3. Run tests to verify they pass
10 4. Check new coverage percentage
11 5. Append progress to progress.txt
12 Claude Code Ralph Loop:
13 Only write tests for ONE function per iteration. From Basic Prompts to…
14
15 Output <promise>COMPLETE</promise> when coverage reaches 80% or higher.
What makes this pattern work:
Clear binary goal (coverage >= 80%)
Claude can verify progress with each iteration
Natural small units (one function = one iteration)
Built-in feedback loop (coverage report)
Expected: Varies by codebase. 10-30 iterations typically.
Pattern 3: Multi-Persona Review
Best for: Code quality and production readiness
Instead of just building, Claude rotates through different reviewer personas.
Each persona catches different issues.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 47/56

## Page 48

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop:
From Basic Prompts to…
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 48/56

## Page 49

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Prompt template: Claude Code Ralph Loop:
From Basic Prompts to…
1 You are reviewing and improving this codebase by rotating through personas.
2
3 Personas:
4 1. Code Reviewer: Check for bugs, edge cases, code quality
5 2. Solution Architect: Check structure, dependencies, patterns
6 3. QA Engineer: Check test coverage, error handling
7 4. Security Reviewer: Check for vulnerabilities, input validation
8 5. Front End Dev: Check UI/UX, accessibility, responsiveness
9
10 For each iteration:
11 1. Select the next persona in rotation
12 2. Review the codebase from that persona's perspective
13 3. Identify ONE issue to fix
14 4. Fix the issue
15 5. Commit with message: "[Persona] - description of fix"
16 6. Log the review in progress.txt
17
18 Continue until ALL personas complete 2 full cycles finding no issues.
19
20 When that condition is met, output <promise>COMPLETE</promise>
Why this works:
Different personas catch different problems.
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 49/56

## Page 50

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Code reviewer sees bugs.
Security reviewer sees vulnerabilities.
QA engineer sees missing tests. Claude Code Ralph Loop:
From Basic Prompts to…
Rotating through all of them creates comprehensive coverage that single-pass reviews
miss.
Expected: 15-30 iterations for thorough review
Pattern 4: Proof of Concept Validator
Best for: Quickly validating ideas, testing tech stacks
You want to see if an idea works before committing to full implementation.
Ralph builds a rough version fast.
Prompt template:
1 Build a proof of concept for: [IDEA]
2
3 Tech stack: [YOUR CHOICES]
4
5 This is a POC, not production code. Priorities:
6 1. Core functionality works
7 2. Happy path is complete
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 50/56

## Page 51

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
8 3. Basic error handling
9 4. Demonstrates the concept
10
11 NOT priorities (skip for now):
12 - Comprehensive tests Claude Code Ralph Loop:
13 - Edge case handling From Basic Prompts to…
14 - Production security
15 - Perfect code quality
16
17 Tasks:
18 1. Set up project structure
19 2. Implement core feature
20 3. Add basic UI (if applicable)
21 4. Verify it works end-to-end
22
23 Output <promise>COMPLETE</promise> when the POC demonstrates the core concept working.
When to use this pattern:
Validating a new architecture
Testing if a tech stack works for your use case
Building a demo for stakeholders
Exploring a new API or service
Key difference: Lower quality bar. You’re not building production code. You’re
answering the question “Does this approach work?”
Expected: 5-10 iterations for basic POC
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 51/56

## Page 52

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Choosing the Right Pattern
Claude Code Ralph Loop:
From Basic Prompts to…
You can also combine patterns. Build with Feature Builder, then polish with
Multi-Persona Review.
Final Thoughts
Ralph Loop is simple at its core - a while loop, a stop hook, and a completion
promise.
But mastery requires:
Understanding the fundamentals
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 52/56

## Page 53

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Building the right architecture
Progressing through the levels
Choosing the right pattern Claude Code Ralph Loop:
From Basic Prompts to…
Resources
PS: I launched the Claude Code Masterclass Git repo, where I will be adding all
these code snippets and templates for quick and easy access.
Finally, this newsletter belongs to all of us. If there’s something that can make it
better or something you don’t like, please let me know.
See you in the next one.
Claude Code Masterclass
Let’s Build It Together
— Joe Njenga
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 53/56

## Page 54

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Claude Code Ralph Loop:
From Basic Prompts to…
Thanks for reading Claude Code Masterclass!
Subscribe for free to receive new posts and
support my work.
ravisarma1618@gmail.com Subscribe
139 Likes ∙14 Restacks
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 54/56

## Page 55

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
Discussion about this post
Claude Code Ralph Loop:
Comments Restacks From Basic Prompts to…
Write a comment...
Sam Miller Apr 2
Check out the Claude Code skill called AutoResearch, similar to Ralph Loop except it's self-evolving.
LIKE (3) REPLY SHARE
Ludo Vecchio Ludo Vecchio Apr 4
Great article! The GitHub Claude-code-master class is 404 and all i can see are Claude tutorials on your
main repo. Just FYI - keep up the great work!!
LIKE (1) REPLY SHARE
4 more comments...
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 55/56

## Page 56

8/1/26, 1:07 AM Claude Code Ralph Loop: From Basic Prompts to Autonomous Overnight Builds
© 2026 Joe · Privacy ∙ Terms ∙ Collection notice
Substack is the home for great culture Claude Code Ralph Loop:
From Basic Prompts to…
https://newsletter.claudecodemasterclass.com/p/claude-code-ralph-loop-from-basic 56/56

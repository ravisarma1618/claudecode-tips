# Best practices for Claude Code - Claude Code Docs

Source file: `C:\mycode\claude code tips\manual pdf\Best practices for Claude Code - Claude Code Docs.pdf`

## Page 1

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
Use Claude Code Best practices for Claude Code
USE CLAUDE CODE
Best practices for Claude Code Copy page
Tips and patterns for getting the most out of Claude Code, from conﬁguring your environment to scaling across parallel
sessions.
Claude Code is an agentic coding environment. Unlike a chatbot that answers questions and waits, Claude Code can read your
ﬁles, run commands, make changes, and autonomously work through problems while you watch, redirect, or step away
entirely.
This changes how you work. Instead of writing code yourself and asking Claude to review it, you describe what you want and
Claude ﬁgures out how to build it. Claude explores, plans, and implements.
But this autonomy still comes with a learning curve. Claude works within certain constraints you need to understand.
This guide covers patterns that have proven effective across Anthropic’s internal teams and for engineers using Claude Code
across various codebases, languages, and environments. For how the agentic loop works under the hood, see How Claude
Code works.
https://code.claude.com/docs/en/best-practices 1/29

## Page 2

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
Most best practices are based on one constraint: Claude’s context window ﬁlls up fast, and performance degrades as it ﬁlls.
Claude’s context window holds your entire conversation, including every message, every ﬁle Claude reads, and every
command output. However, this can ﬁll up fast. A single debugging session or codebase exploration might generate and
consume tens of thousands of tokens.
This matters since LLM performance degrades as context ﬁlls. When the context window is getting full, Claude may start
“forgetting” earlier instructions or making more mistakes. The context window is the most important resource to manage. To
see how a session ﬁlls up in practice, watch an interactive walkthrough of what loads at startup and what each ﬁle read
costs. Track context usage continuously with a custom status line, and see Reduce token usage for strategies on reducing
token usage.
Give Claude a way to verify its work
Give Claude a check it can run: tests, a build, a screenshot to compare. It’s the difference between a session you watch and one you
walk away from.
Claude stops when the work looks done. Without a check it can run, “looks done” is the only signal available, and you become
the veriﬁcation loop: every mistake waits for you to notice it. Give Claude something that produces a pass or fail, and the loop
closes on its own. Claude does the work, runs the check, reads the result, and iterates until the check passes.
The check is anything that returns a signal Claude can read in the conversation: a test suite, a build exit code, a linter, a script
that diffs output against a ﬁxture, or a browser screenshot compared against a design.
https://code.claude.com/docs/en/best-practices 2/29

## Page 3

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
Strategy Before After
Provide veriﬁcation ”implement a function that "write a validateEmail function. example test cases: user@example.com is
criteria validates email addresses" true, invalid is false, user@.com is false. run the tests after implementing”
Verify UI changes visually ”make the dashboard look better" "[paste screenshot] implement this design. take a screenshot of the result
and compare it to the original. list differences and ﬁx them”
Address root causes, not ”the build is failing" "the build fails with this error: [paste error]. ﬁx it and verify the build
symptoms succeeds. address the root cause, don’t suppress the error”
Once the check exists, decide how hard it gates the stop:
In one prompt: ask Claude to run the check and iterate in the same message, as in the table above.
Across a session: set the check as a /goal condition. A separate evaluator re-checks it after every turn and Claude
keeps working until it holds.
As a deterministic gate: a Stop hook runs your check as a script and blocks the turn from ending until it passes. Claude
Code overrides the hook and ends the turn after 8 consecutive blocks.
By a second opinion: a veriﬁcation subagent or a dynamic workﬂow that checks its own ﬁndings has a fresh model try to
refute the result, so the agent doing the work isn’t the one grading it.
Each step trades setup for attention. The prompt version works on any task today. The /goal and Stop hook versions are
what let an unattended run ﬁnish correctly without you.
Have Claude show evidence rather than asserting success: the test output, the command it ran and what it returned, or a
screenshot of the result. Reviewing evidence is faster than re-running the veriﬁcation yourself, and it works for sessions you
weren’t watching.
https://code.claude.com/docs/en/best-practices 3/29

## Page 4

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
Explore ﬁrst, then plan, then code
Separate research and planning from implementation to avoid solving the wrong problem.
Letting Claude jump straight to coding can produce code that solves the wrong problem. Use plan mode to separate
exploration from execution.
The recommended workﬂow has four phases:
1 Explore
Enter plan mode. Claude reads ﬁles and answers questions without making changes.
claude (plan mode)
read /src/auth and understand how we handle sessions and login.
also look at how we manage environment variables for secrets.
2 Plan
Ask Claude to create a detailed implementation plan.
https://code.claude.com/docs/en/best-practices 4/29

## Page 5

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
claude (plan mode)
I want to add Google OAuth. What files need to change?
What's the session flow? Create a plan.
Press Ctrl+G to open the plan in your text editor for direct editing before Claude proceeds.
3 Implement
Switch out of plan mode and let Claude code, verifying against its plan.
claude (default mode)
implement the OAuth flow from your plan. write tests for the
callback handler, run the test suite and fix any failures.
4 Commit
Ask Claude to commit with a descriptive message and create a PR.
claude (default mode)
commit with a descriptive message and open a PR
https://code.claude.com/docs/en/best-practices 5/29

## Page 6

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
Plan mode is useful, but also adds overhead.
For tasks where the scope is clear and the ﬁx is small (like ﬁxing a typo, adding a log line, or renaming a variable) ask Claude to do it
directly.
Planning is most useful when you’re uncertain about the approach, when the change modiﬁes multiple ﬁles, or when you’re unfamiliar
with the code being modiﬁed. If you could describe the diff in one sentence, skip the plan.
Provide speciﬁc context in your prompts
The more precise your instructions, the fewer corrections you’ll need.
Claude can infer intent, but it can’t read your mind. Reference speciﬁc ﬁles, mention constraints, and point to example
patterns.
Strategy Before After
Scope the task. Specify which ”add tests for foo.py" "write a test for foo.py covering the edge case where the user is logged out.
ﬁle, what scenario, and testing avoid mocks.”
preferences.
Point to sources. Direct Claude ”why does "look through ExecutionFactory’s git history and summarize how its api came to
to the source that can answer a ExecutionFactory have be”
question. such a weird api?"
Reference existing patterns. ”add a calendar widget" "look at how existing widgets are implemented on the home page to understand
Point Claude to patterns in your the patterns. HotDogWidget.php is a good example. follow the pattern to
codebase. implement a new calendar widget that lets the user select a month and
https://code.claude.com/docs/en/best-practices 6/29

## Page 7

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
Strategy Before After
paginate forwards/backwards to pick a year. build from scratch without libraries
other than the ones already used in the codebase.”
Describe the symptom. Provide ”ﬁx the login bug" "users report that login fails after session timeout. check the auth ﬂow in
the symptom, the likely location, src/auth/, especially token refresh. write a failing test that reproduces the
and what “ﬁxed” looks like. issue, then ﬁx it”
Vague prompts can be useful when you’re exploring and can afford to course-correct. A prompt like "what would you
improve in this file?" can surface things you wouldn’t have thought to ask about.
Provide rich content
Use @ to reference ﬁles, paste screenshots/images, or pipe data directly.
You can provide rich data to Claude in several ways:
Reference ﬁles with @ instead of describing where code lives. Claude reads the ﬁle before responding.
Paste images directly. Copy/paste or drag and drop images into the prompt.
Give URLs for documentation and API references. Use /permissions to allowlist frequently-used domains.
Pipe in data by running cat error.log | claude to send ﬁle contents directly.
Let Claude fetch what it needs. Tell Claude to pull context itself using Bash commands, MCP tools, or by reading ﬁles.
https://code.claude.com/docs/en/best-practices 7/29

## Page 8

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
Conﬁgure your environment
A few setup steps make Claude Code signiﬁcantly more effective across all your sessions. For a full overview of extension
features and when to use each one, see Extend Claude Code.
Write an eﬀective CLAUDE.md
Run /init to generate a starter CLAUDE.md ﬁle based on your current project structure, then reﬁne over time.
CLAUDE.md is a special ﬁle that Claude reads at the start of every conversation. Include Bash commands, code style, and
workﬂow rules. This gives Claude persistent context it can’t infer from code alone.
The /init command analyzes your codebase to detect build systems, test frameworks, and code patterns, giving you a solid
foundation to reﬁne.
There’s no required format for CLAUDE.md ﬁles, but keep it short and human-readable. For example:
CLAUDE.md
# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')
# Workflow
- Be sure to typecheck when you're done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
https://code.claude.com/docs/en/best-practices 8/29

## Page 9

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
Run /context to conﬁrm Claude loaded the ﬁle. CLAUDE.md is loaded every session, so only include things that apply
broadly. For domain knowledge or workﬂows that are only relevant sometimes, use skills instead. Claude loads them on
demand without bloating every conversation.
Keep it concise. For each line, ask: “Would removing this cause Claude to make mistakes?” If not, cut it. Bloated CLAUDE.md
ﬁles cause Claude to ignore your actual instructions!
✅ Include ❌ Exclude
Bash commands Claude can’t guess Anything Claude can ﬁgure out by reading code
Code style rules that differ from defaults Standard language conventions Claude already knows
Testing instructions and preferred test runners Detailed API documentation (link to docs instead)
Repository etiquette (branch naming, PR conventions) Information that changes frequently
Architectural decisions speciﬁc to your project Long explanations or tutorials
Developer environment quirks (required env vars) File-by-ﬁle descriptions of the codebase
Common gotchas or non-obvious behaviors Self-evident practices like “write clean code”
If Claude keeps doing something you don’t want despite having a rule against it, the ﬁle is probably too long and the rule is
getting lost. If Claude asks you questions that are answered in CLAUDE.md, the phrasing might be ambiguous. Treat
CLAUDE.md like code: review it when things go wrong, prune it regularly, and test changes by observing whether Claude’s
behavior actually shifts.
You can tune instructions by adding emphasis (e.g., “IMPORTANT” or “YOU MUST”) to improve adherence. Check CLAUDE.md
into git so your team can contribute. The ﬁle compounds in value over time.
https://code.claude.com/docs/en/best-practices 9/29

## Page 10

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
CLAUDE.md ﬁles can import additional ﬁles using @path/to/import syntax:
CLAUDE.md
See @README.md for project overview and @package.json for available npm commands.
# Additional Instructions
- Git workflow: @docs/git-instructions.md
- Personal overrides: @~/.claude/my-project-instructions.md
You can place CLAUDE.md ﬁles in several locations:
Home folder ( ~/.claude/CLAUDE.md ): applies to all Claude sessions
Project root ( ./CLAUDE.md ): check into git to share with your team
Project root ( ./CLAUDE.local.md ): personal project-speciﬁc notes; add this ﬁle to your .gitignore so it isn’t shared
with your team
Parent directories: useful for monorepos where both root/CLAUDE.md and root/foo/CLAUDE.md are pulled in
automatically
Child directories: Claude pulls in child CLAUDE.md ﬁles on demand when it reads a ﬁle in those directories
Conﬁgure permissions
Use auto mode to let a classiﬁer handle approvals, /permissions to allowlist speciﬁc commands, or /sandbox for OS-level
isolation. Each reduces interruptions while keeping you in control.
https://code.claude.com/docs/en/best-practices 10/29

## Page 11

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
By default, Claude Code requests permission for actions that might modify your system: ﬁle writes, Bash commands, MCP
tools, etc. This is safe but tedious. After the tenth approval you’re not really reviewing anymore, you’re just clicking through.
There are three ways to reduce these interruptions:
Auto mode: a separate classiﬁer model reviews commands and blocks only what looks risky: scope escalation, unknown
infrastructure, or hostile-content-driven actions. Best when you trust the general direction of a task but don’t want to
click through every step
Permission allowlists: permit speciﬁc tools you know are safe, like npm run lint or git commit
Sandboxing: enable OS-level isolation that restricts ﬁlesystem and network access, allowing Claude to work more freely
within deﬁned boundaries
Read more about permission modes, permission rules, and sandboxing.
Use CLI tools
Tell Claude Code to use CLI tools like gh, aws, gcloud, and sentry-cli when interacting with external services.
CLI tools are the most context-efﬁcient way to interact with external services. If you use GitHub, install the gh CLI. Claude
knows how to use it for creating issues, opening pull requests, and reading comments. Without gh, Claude can still use the
GitHub API, but unauthenticated requests often hit rate limits.
Claude is also effective at learning CLI tools it doesn’t already know. Try prompts like Use 'foo-cli-tool --help' to learn
about foo tool, then use it to solve A, B, C.
Connect MCP servers
https://code.claude.com/docs/en/best-practices 11/29

## Page 12

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
Run claude mcp add to connect external tools like Notion, Figma, or your database.
With MCP servers, you can ask Claude to implement features from issue trackers, query databases, analyze monitoring data,
integrate designs from Figma, and automate workﬂows.
Set up hooks
Use hooks for actions that must happen every time with zero exceptions.
Hooks run scripts automatically at speciﬁc points in Claude’s workﬂow. Unlike CLAUDE.md instructions which are advisory,
hooks are deterministic and guarantee the action happens.
Claude can write hooks for you. Try prompts like “Write a hook that runs eslint after every ﬁle edit” or “Write a hook that blocks
writes to the migrations folder.” Edit .claude/settings.json directly to conﬁgure hooks by hand, and run /hooks to
browse what’s conﬁgured.
Create skills
Create SKILL.md ﬁles in .claude/skills/ to give Claude domain knowledge and reusable workﬂows.
Skills extend Claude’s knowledge with information speciﬁc to your project, team, or domain. Claude applies them
automatically when relevant, or you can invoke them directly with /skill-name.
Create a skill by adding a directory with a SKILL.md to .claude/skills/:
https://code.claude.com/docs/en/best-practices 12/29

## Page 13

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
.claude/skills/api-conventions/SKILL.md
---
name: api-conventions
description: REST API design conventions for our services
---
# API Conventions
- Use kebab-case for URL paths
- Use camelCase for JSON properties
- Always include pagination for list endpoints
- Version APIs in the URL path (/v1/, /v2/)
Skills can also deﬁne repeatable workﬂows you invoke directly:
https://code.claude.com/docs/en/best-practices 13/29

## Page 14

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
.claude/skills/ﬁx-issue/SKILL.md
---
name: fix-issue
description: Fix a GitHub issue
disable-model-invocation: true
---
Analyze and fix the GitHub issue: $ARGUMENTS.
1. Use `gh issue view` to get the issue details
2. Understand the problem described in the issue
3. Search the codebase for relevant files
4. Implement the necessary changes to fix the issue
5. Write and run tests to verify the fix
6. Ensure code passes linting and type checking
7. Create a descriptive commit message
8. Push and create a PR
Run /fix-issue 1234 to invoke it. Use disable-model-invocation: true for workﬂows with side effects that you want to
trigger manually.
Create custom subagents
Deﬁne specialized assistants in .claude/agents/ that Claude can delegate to for isolated tasks.
Subagents run in their own context with their own set of allowed tools. They’re useful for tasks that read many ﬁles or need
specialized focus without cluttering your main conversation.
https://code.claude.com/docs/en/best-practices 14/29

## Page 15

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
.claude/agents/security-reviewer.md
---
name: security-reviewer
description: Reviews code for security vulnerabilities
tools: Read, Grep, Glob, Bash
model: opus
---
You are a senior security engineer. Review code for:
- Injection vulnerabilities (SQL, XSS, command injection)
- Authentication and authorization flaws
- Secrets or credentials in code
- Insecure data handling
Provide specific line references and suggested fixes.
Tell Claude to use subagents explicitly: “Use a subagent to review this code for security issues.”
Install plugins
Run /plugin to browse the marketplace. Plugins add skills, tools, and integrations without conﬁguration.
Plugins bundle skills, hooks, subagents, and MCP servers into a single installable unit from the community and Anthropic. If
you work with a typed language, install a code intelligence plugin to give Claude precise symbol navigation and automatic
error detection after edits.
For guidance on choosing between skills, subagents, hooks, and MCP, see Extend Claude Code.
https://code.claude.com/docs/en/best-practices 15/29

## Page 16

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
Communicate eﬀectively
The way you communicate with Claude Code signiﬁcantly impacts the quality of results.
Ask codebase questions
Ask Claude questions you’d ask a senior engineer.
When onboarding to a new codebase, use Claude Code for learning and exploration. You can ask Claude the same sorts of
questions you would ask another engineer:
How does logging work?
How do I make a new API endpoint?
What does async move { ... } do on line 134 of foo.rs?
What edge cases does CustomerOnboardingFlowImpl handle?
Why does this code call foo() instead of bar() on line 333?
Using Claude Code this way is an effective onboarding workﬂow, improving ramp-up time and reducing load on other
engineers. No special prompting required: ask questions directly.
Let Claude interview you
https://code.claude.com/docs/en/best-practices 16/29

## Page 17

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
For larger features, have Claude interview you ﬁrst. Start with a minimal prompt and ask Claude to interview you using the
AskUserQuestion tool.
Claude asks about things you might not have considered yet, including technical implementation, UI/UX, edge cases, and
tradeoffs. Replace [brief description] with your feature before sending the prompt.
I want to build [brief description]. Interview me in detail using the AskUserQuestion tool.
Ask about technical implementation, UI/UX, edge cases, concerns, and tradeoffs. Don't ask obvious
questions, dig into the hard parts I might not have considered.
Keep interviewing until we've covered everything, then write a complete spec to SPEC.md.
Once the spec is complete, start a fresh session to execute it. The new session has clean context focused entirely on
implementation, and you have a written spec to reference.
The most useful specs are self-contained: they name the ﬁles and interfaces involved, state what is out of scope, and end with
an end-to-end veriﬁcation step that proves the feature works. Time spent making the spec precise pays off more than time
spent watching the implementation.
Manage your session
Conversations are persistent and reversible. Use this to your advantage!
https://code.claude.com/docs/en/best-practices 17/29

## Page 18

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
Course-correct early and often
Correct Claude as soon as you notice it going off track.
The best results come from tight feedback loops. Though Claude occasionally solves problems perfectly on the ﬁrst attempt,
correcting it quickly generally produces better solutions faster.
Esc : stop Claude mid-action with the Esc key. Context is preserved, so you can redirect.
Esc + Esc or /rewind: press Esc twice or run /rewind to open the rewind menu and restore previous conversation
and code state, or summarize from a selected message.
"Undo that" : have Claude revert its changes.
/clear : reset context between unrelated tasks. Long sessions with irrelevant context can reduce performance.
If you’ve corrected Claude more than twice on the same issue in one session, the context is cluttered with failed approaches.
Run /clear and start fresh with a more speciﬁc prompt that incorporates what you learned. A clean session with a better
prompt almost always outperforms a long session with accumulated corrections.
Manage context aggressively
Run /clear between unrelated tasks to reset context.
Claude Code automatically compacts conversation history when you approach context limits, which preserves important
code and decisions while freeing space.
https://code.claude.com/docs/en/best-practices 18/29

## Page 19

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
During long sessions, Claude’s context window can ﬁll with irrelevant conversation, ﬁle contents, and commands. This can
reduce performance and sometimes distract Claude.
Use /clear frequently between tasks to reset the context window entirely
When auto compaction triggers, Claude summarizes what matters most, including code patterns, ﬁle states, and key
decisions
For more control, run /compact <instructions>, like /compact Focus on the API changes
To compact only part of the conversation, use Esc + Esc or /rewind, select a message checkpoint, and choose
Summarize from here or Summarize up to here. The ﬁrst condenses messages from that point forward while keeping
earlier context intact; the second condenses earlier messages while keeping recent ones in full. See the rewind menu’s
summarize options.
Customize compaction behavior in CLAUDE.md with instructions like "When compacting, always preserve the full
list of modified files and any test commands" to ensure critical context survives summarization
For quick questions that don’t need to stay in context, use /btw. The answer appears in a dismissible overlay and never
enters conversation history, so you can check a detail without growing context.
Use subagents for investigation
Delegate research with "use subagents to investigate X". They explore in a separate context, keeping your main conversation
clean for implementation.
Since context is your fundamental constraint, subagents are one of the most powerful tools available. When Claude
researches a codebase it reads lots of ﬁles, all of which consume your context. Subagents run in separate context windows
and report back summaries:
https://code.claude.com/docs/en/best-practices 19/29

## Page 20

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
Use subagents to investigate how our authentication system handles token
refresh, and whether we have any existing OAuth utilities I should reuse.
The subagent explores the codebase, reads relevant ﬁles, and reports back with ﬁndings, all without cluttering your main
conversation.
You can also use subagents for veriﬁcation after Claude implements something:
use a subagent to review this code for edge cases
Rewind with checkpoints
Every prompt you send creates a checkpoint. You can restore conversation, code, or both to any previous checkpoint.
Claude automatically snapshots ﬁles before each change so a checkpoint can restore them. Double-tap Escape or run
/rewind to open the rewind menu. You can restore conversation only, restore code only, restore both, or summarize from a
selected message. See Checkpointing for details.
Instead of carefully planning every move, you can tell Claude to try something risky. If it doesn’t work, rewind and try a
different approach. Checkpoints are saved with the conversation, so you can close your terminal, resume the session later,
and still rewind.
Checkpoints only track changes made through Claude’s ﬁle editing tools. Changes made through Bash commands or external
processes are not captured. This isn’t a replacement for git.
https://code.claude.com/docs/en/best-practices 20/29

## Page 21

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
Resume conversations
Name sessions with /rename and treat them like branches: each workstream gets its own persistent context.
Claude Code saves conversations locally, so when a task spans multiple sittings you don’t have to re-explain the context. Run
claude --continue to pick up the most recent session, or claude --resume to choose from a list. Give sessions
descriptive names like oauth-migration so you can ﬁnd them later. See Manage sessions for the full set of resume, branch,
and naming controls.
Automate and scale
Once you’re effective with one Claude, multiply your output with parallel sessions, non-interactive mode, and fan-out
patterns.
Everything so far assumes one human, one Claude, and one conversation. But Claude Code scales horizontally. The
techniques in this section show how you can get more done.
Run non-interactive mode
Use claude -p "prompt" in CI, pre-commit hooks, or scripts. Add --output-format stream-json --verbose for streaming JSON
output.
https://code.claude.com/docs/en/best-practices 21/29

## Page 22

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
With claude -p "your prompt" , you can run Claude non-interactively, without an interactive prompt. The run still creates a
resumable session unless you pass --no-session-persistence . Non-interactive mode is how you integrate Claude into CI
pipelines, pre-commit hooks, or any automated workﬂow. The output formats let you parse results programmatically: plain
text, JSON, or streaming JSON.
# One-off queries
claude -p "Explain what this project does"
# Structured output for scripts
claude -p "List all API endpoints" --output-format json
# Streaming for real-time processing
claude -p "Analyze this log file" --output-format stream-json --verbose
The ﬁrst command prints plain text. The json format returns a single JSON object with a result ﬁeld. The stream-json
format prints one JSON object per line, starting with an init event.
Run multiple Claude sessions
Run multiple Claude sessions in parallel to speed up development, run isolated experiments, or start complex workﬂows.
Pick the parallel approach that ﬁts how much coordination you want to do yourself:
Worktrees: run separate CLI sessions in isolated git checkouts so edits don’t collide
Desktop app: manage multiple local sessions visually, each in its own worktree
https://code.claude.com/docs/en/best-practices 22/29

## Page 23

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
Claude Code on the web: run sessions on Anthropic-managed cloud infrastructure in isolated VMs
Agent teams: automated coordination of multiple sessions with shared tasks, messaging, and a team lead
Beyond parallelizing work, multiple sessions enable quality-focused workﬂows. A fresh context improves code review since
Claude won’t be biased toward code it just wrote.
For example, use a Writer/Reviewer pattern:
Session A (Writer) Session B (Reviewer)
Implement a rate limiter for our API
endpoints
Review the rate limiter implementation in @src/middleware/rateLimiter.ts. Look for
edge cases, race conditions, and consistency with our existing middleware
patterns.
Here's the review feedback: [Session B
output]. Address these issues.
You can do something similar with tests: have one Claude write tests, then another write code to pass them.
Fan out across ﬁles
Loop through tasks calling claude -p for each. Use --allowedTools to scope permissions for batch operations.
For large migrations or analyses, you can distribute work across many parallel Claude invocations:
https://code.claude.com/docs/en/best-practices 23/29

## Page 24

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
1 Generate a task list
Have Claude list all ﬁles that need migrating (e.g., list all 2,000 Python files that need migrating )
2 Write a script to loop through the list
for file in $(cat files.txt); do
claude -p "Migrate $file from React to Vue. Return OK or FAIL." \
--allowedTools "Edit,Bash(git commit *)"
done
3 Test on a few ﬁles, then run at scale
Reﬁne your prompt based on what goes wrong with the ﬁrst 2-3 ﬁles, then run on the full set. The --allowedTools
ﬂag restricts what Claude can do, which matters when you’re running unattended.
You can also integrate Claude into existing data/processing pipelines:
claude -p "<your prompt>" --output-format json | your_command
Use --verbose for debugging during development, and turn it off in production.
Run autonomously with auto mode
https://code.claude.com/docs/en/best-practices 24/29

## Page 25

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
For uninterrupted execution with background safety checks, use auto mode. A classiﬁer model reviews commands before
they run, blocking scope escalation, unknown infrastructure, and hostile-content-driven actions while letting routine work
proceed without prompts.
claude --permission-mode auto -p "fix all lint errors"
For non-interactive runs with the -p ﬂag, auto mode aborts if the classiﬁer repeatedly blocks actions, since there is no user
to fall back to. See when auto mode falls back for thresholds.
Add an adversarial review step
Before treating a task as done, have a subagent review the diff in a fresh context and report gaps.
The longer Claude works unattended, the more an independent check matters before you count the work as done. A reviewer
running in a fresh subagent context sees only the diff and the criteria you give it, not the reasoning that produced the change,
so it evaluates the result on its own terms.
For a correctness check, run the bundled /code-review skill, which reviews the current diff for bugs in a fresh subagent and
returns ﬁndings to the session. To check the diff against your plan instead, write the review prompt yourself. Name the work
to check, the plan to check it against, and what counts as a ﬁnding:
Use a subagent to review the rate limiter diff against PLAN.md. Check that
every requirement is implemented, the listed edge cases have tests, and
nothing outside the task's scope changed. Report gaps, not style preferences.
https://code.claude.com/docs/en/best-practices 25/29

## Page 26

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
Because the reviewer runs as a subagent, the implementing session receives the gaps directly and can ﬁx them and re-review
without you copying ﬁndings between windows. For longer autonomous runs, an agent team can keep this loop going across
many tasks while you spot-check the recorded ﬁndings.
A reviewer prompted to ﬁnd gaps will usually report some, even when the work is sound, because that is what it was asked to do. Chasing
every ﬁnding leads to over-engineering: extra abstraction layers, defensive code, and tests for cases that can’t happen. Tell the reviewer
to ﬂag only gaps that affect correctness or the stated requirements, and treat the rest as optional.
Avoid common failure patterns
These are common mistakes. Recognizing them early saves time:
The kitchen sink session. You start with one task, then ask Claude something unrelated, then go back to the ﬁrst task.
Context is full of irrelevant information.
Fix: /clear between unrelated tasks.
Correcting over and over. Claude does something wrong, you correct it, it’s still wrong, you correct again. Context is
polluted with failed approaches.
Fix: After two failed corrections, /clear and write a better initial prompt incorporating what you learned.
The over-speciﬁed CLAUDE.md. If your CLAUDE.md is too long, Claude ignores half of it because important rules get lost
in the noise.
https://code.claude.com/docs/en/best-practices 26/29

## Page 27

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
Fix: Ruthlessly prune. If Claude already does something correctly without the instruction, delete it or convert it to a
hook.
The trust-then-verify gap. Claude produces a plausible-looking implementation that doesn’t handle edge cases.
Fix: Always provide veriﬁcation (tests, scripts, screenshots). If you can’t verify it, don’t ship it.
The inﬁnite exploration. You ask Claude to “investigate” something without scoping it. Claude reads hundreds of ﬁles,
ﬁlling the context.
Fix: Scope investigations narrowly or use subagents so the exploration doesn’t consume your main context.
Develop your intuition
The patterns in this guide aren’t set in stone. They’re starting points that work well in general, but might not be optimal for
every situation.
Sometimes you should let context accumulate because you’re deep in one complex problem and the history is valuable.
Sometimes you should skip planning and let Claude ﬁgure it out because the task is exploratory. Sometimes a vague prompt is
exactly right because you want to see how Claude interprets the problem before constraining it.
Pay attention to what works. When Claude produces great output, notice what you did: the prompt structure, the context you
provided, the mode you were in. When Claude struggles, ask why. Was the context too noisy? The prompt too vague? The task
too big for one pass?
https://code.claude.com/docs/en/best-practices 27/29

## Page 28

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
Over time, you’ll develop intuition that no guide can capture. You’ll know when to be speciﬁc and when to be open-ended,
when to plan and when to explore, when to clear context and when to let it accumulate.
Related resources
How Claude Code works: the agentic loop, tools, and context management
Extend Claude Code: skills, hooks, MCP, subagents, and plugins
Common workﬂows: step-by-step recipes for debugging, testing, PRs, and more
CLAUDE.md: store project conventions and persistent context
Was this page helpful? Yes No
Prompt library Overview
Company Help and security Learn Terms and policies
Anthropic Availability Courses Privacy choices
Careers Status MCP connectors Privacy policy
Economic Futures Support center Customer stories Disclosure policy
Research Engineering blog Usage policy
https://code.claude.com/docs/en/best-practices 28/29

## Page 29

8/1/26, 1:03 AM Best practices for Claude Code - Claude Code Docs
News Events Commercial terms
Trust center Powered by Claude Consumer terms
Transparency Service partners
Startups program
https://code.claude.com/docs/en/best-practices 29/29

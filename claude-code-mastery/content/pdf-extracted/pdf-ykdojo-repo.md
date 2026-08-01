# YKDOJO~1

Source file: `C:\mycode\CLAUDE~2\MANUAL~2\YKDOJO~1.PDF`

## Page 1

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
ykdojo claude-code-tips
Code Issues 2 Pull requests 2 Agents Actions Projects Security and quality Insights
claude-code-tips Public Watch 62 Fork 752 Starred 9.5k
About
40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself
in a container. Also includes the dx plugin: skills for everyday dev workflows.
agentic agentic-ai agentic-coding agentic-workflow ai claude claude-ai claude-code cli developer-tools productivity tips-and-tricks
Readme
License
Activity
9.5k stars
62 watching
752 forks
Report repository
Releases 46
v0.26.30 Latest
last week
+ 45 releases
Deployments 174
github-pages last week
Packages
https://github.com/ykdojo/claude-code-tips 1/46

## Page 2

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
No packages published
Contributors 5
Languages
HTML 59.9% Shell 27% JavaScript 13.1%
m… 19 Branches 69 Tags Go to file T Go to file Add file Code
ykdojo Tip 33: it's the artifact card that opens in the app, not the link (#53) 31038b8 · last week
.claude-plugin Update version-check skill from a real updat… last week
assets Add LinkedIn cover (1920x1080) for 7 advan… 2 weeks ago
content Add thorough testing to the Verify step (#45) 2 weeks ago
scripts fix: correct stat mtime detection on Linux (G… last week
skills Update version-check skill from a real updat… last week
.gitignore Ignore .playwright-mcp directory 2 months ago
CLAUDE.md CLAUDE.md: note non-interactive local plugi… 2 months ago
GLOBAL-CLAUDE.md Tighten default response length: ~200 to ~1… 2 months ago
LICENSE Add custom license with contributor agree… 8 months ago
README.md Tip 33: it's the artifact card that opens in the… last week
https://github.com/ykdojo/claude-code-tips 2/46

## Page 3

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
40+ Claude Code Tips: From Basics to Advanced
Here are my tips for getting the most out of Claude Code, including a custom status line script and Claude Code running itself in a
container. Also includes the dx plugin: skills for everyday dev workflows.
📺 Quick demo - See some of these tips in action with a multi-Claude workflow and voice input:
https://github.com/ykdojo/claude-code-tips 3/46

## Page 4

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Table of Contents
Tip 0: Customize your status line
Tip 1: Learn a few essential slash commands
Tip 2: Talk to Claude Code with your voice
Tip 3: Break down large problems into smaller ones
Tip 4: Using Git and GitHub CLI like a pro
Tip 5: AI context is like milk; it's best served fresh and condensed!
https://github.com/ykdojo/claude-code-tips 4/46

## Page 5

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Tip 6: Getting output out of your terminal
Tip 7: Set up terminal aliases for quick access
Tip 8: Proactively compact your context
Tip 9: Complete the write-test cycle for autonomous tasks
Tip 10: Cmd+A and Ctrl+A are your friends
Tip 11: Invest in your own workflow
Tip 12: Search through your conversation history
Tip 13: Multitasking with terminal tabs
Tip 14: Git worktrees for parallel branch work
READMETip 15: Manual exponential backoff for long-running jobsLicense
Tip 16: Claude Code as a writing assistant
Tip 17: Markdown is the s**t
Tip 18: Use Notion to preserve links when pasting
Tip 19: Isolated environments for long-running risky tasks
Tip 20: The best way to get better at using Claude Code is by using it
Tip 21: Fork and half-clone conversations
Tip 22: Use realpath to get absolute paths
Tip 23: Understanding CLAUDE.md vs Skills vs Slash Commands vs Plugins
Tip 24: Interactive PR reviews
Tip 25: Claude Code as a research tool
Tip 26: Mastering different ways of verifying its output
Tip 27: Claude Code as a DevOps engineer
Tip 28: Keep CLAUDE.md simple and review it periodically
Tip 29: Claude Code as the universal interface
Tip 30: It's all about choosing the right level of abstraction
Tip 31: Use auto mode
Tip 32: Control Claude Code from your phone
Tip 33: Learn to use artifacts
https://github.com/ykdojo/claude-code-tips 5/46

## Page 6

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Tip 34: Write lots of tests (and use TDD)
Tip 35: Be braver in the unknown; iterative problem solving
Tip 36: Running bash commands and subagents in the background
Tip 37: The era of personalized software is here
Tip 38: Navigating and editing your input box
Tip 39: Spend some time planning, but also prototype quickly
Tip 40: Simplify overcomplicated code
Tip 41: Automation of automation
Tip 42: Share your knowledge and contribute where you can
Tip 43: Keep learning!
Tip 44: Install the dx plugin
Tip 45: Quick setup script
Tip 46: Switch between multiple Claude accounts
Tip 0: Customize your status line
You can customize the status line at the bottom of Claude Code to show useful info. I set mine up to show the model, current directory, git
branch (if any), uncommitted file count, sync status with origin, and a visual progress bar for token usage. It also shows a second line with
my last message so I can see what the conversation was about:
Opus 4.5 | 📁claude-code-tips | 🔀main (scripts/context-bar.sh uncommitted, synced 12m ago) | ██░░░░░░░░ 18% of 200k
tokens
💬 This is good. I don't think we need to change the documentation as long as we don't say that the default color is
orange el...
This is especially helpful for keeping an eye on your context usage and remembering what you were working on. The script also supports
10 color themes (orange, blue, teal, green, lavender, rose, gold, slate, cyan, or gray).
https://github.com/ykdojo/claude-code-tips 6/46

## Page 7

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
To set this up, you can use this sample script and check the setup instructions.
Tip 1: Learn a few essential slash commands
There are a bunch of built-in slash commands (type / to see them all). Here are a few worth knowing:
/usage
https://github.com/ykdojo/claude-code-tips 7/46

## Page 8

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Check your rate limits:
Current session
█████████▌ 19% used
Resets 12:59am (America/Vancouver)
Current week (all models)
█████████████████████▌ 43% used
Resets Feb 3 at 1:59pm (America/Vancouver)
Current week (Sonnet only)
███████████████████▌ 39% used
Resets 8:59am (America/Vancouver)
If you want to watch your usage closely, keep it open in a tab and use Tab then Shift+Tab or ← then → to refresh.
/chrome
Toggle Claude's native browser integration:
> /chrome
Chrome integration enabled
/mcp
Manage MCP (Model Context Protocol) servers:
Manage MCP servers
1 server
❯ 1. playwright ✔ connected · Enter to view details
MCP Config locations (by scope):
• User config (available in all your projects):
• /Users/yk/.claude.json
https://github.com/ykdojo/claude-code-tips 8/46

## Page 9

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
/stats
View your usage statistics with a GitHub-style activity graph:
Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec Jan
··········································▒█░▓░█░▓▒▒
Mon ·········································▒▒██▓░█▓█░█
·········································░▒█▒▓░█▒█▒█
Wed ········································░▓▒█▓▓░▒▓▒██
········································░▓░█▓▓▓▓█░▒█
Fri ········································▒░░▓▒▒█▓▓▓█
········································▒▒░▓░░▓▒▒░░
Less ░ ▒ ▓ █ More
Favorite model: Opus 4.5 Total tokens: 17.6m
Sessions: 4.1k Longest session: 20h 40m 45s
Active days: 79/80 Longest streak: 75 days
Most active day: Jan 26 Current streak: 74 days
You've used ~24x more tokens than War and Peace
/clear
Clear the conversation and start fresh.
Tip 2: Talk to Claude Code with your voice
I found that you can communicate much faster with your voice than typing with your hands. Using a voice transcription system on your
local machine is really helpful for this.
On my Mac, I've tried a few different options:
superwhisper
MacWhisper
https://github.com/ykdojo/claude-code-tips 9/46

## Page 10

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Super Voice Assistant (open source, supports Parakeet v2/v3)
You can get more accuracy by using a hosted service, but I found that a local model is strong enough for this purpose. Even when there are
mistakes or typos in the transcription, Claude is smart enough to understand what you're trying to say. Sometimes you need to say certain
things extra clearly, but overall local models work well enough.
For example, in this screenshot you can see that Claude was able to interpret mistranscribed words like "ExcelElanishMark" and "advast"
correctly as "exclamation mark" and "Advanced":
https://github.com/ykdojo/claude-code-tips 10/46

## Page 11

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
I think the best way to think about this is like you're trying to communicate with your friend. Of course, you can communicate through
texts. That might be easier for some people, or emails, right? That's totally fine. That's what most people seem to do with Claude Code. But
if you want to communicate faster, why wouldn't you get on a quick phone call? You can just send voice messages. You don't need to
literally have a phone call with Claude Code. Just send a bunch of voice messages. It's faster, at least for me, as someone who's practiced
the art of speaking a lot over the past number of years. But I think for a majority of people, it's going to be faster too.
A common objection is "what if you're in a room with other people?" I just whisper using earphones - I personally like Apple EarPods (not
AirPods). They're affordable, high quality enough, and you just whisper into them quietly. I've done it in front of other people and it works
well. In offices, people talk anyway - instead of talking to coworkers, you're talking quietly to your voice transcription system. I don't think
there's any problem with that. This method works so well that it even works on a plane. It's loud enough that other people won't hear you,
but if you speak close enough to the mic, your local model can still understand what you're saying. (In fact, I'm writing this very paragraph
using that method on a flight.)
Update: Claude Code now has a built-in voice mode. I tested it and it works well, but I still personally use a local model because I find it
faster.
Tip 3: Break down large problems into smaller ones
This is one of the most important concepts to master. It's exactly the same as traditional software engineering - the best software
engineers already know how to do this, and it applies to Claude Code too.
If you find that Claude Code isn't able to one-shot a difficult problem or coding task, ask it to break it down into multiple smaller issues.
See if it can solve an individual part of that problem. If it's still too hard, see if it can solve an even smaller sub-problem. Keep going until
everything is solvable.
Essentially, instead of going from A to B:
https://github.com/ykdojo/claude-code-tips 11/46

## Page 12

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
You can go from A to A1 to A2 to A3, then to B:
https://github.com/ykdojo/claude-code-tips 12/46

## Page 13

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
A good example of this is when I was building my own voice transcription system. I needed to build a system that could let the user select
and download a model, take keyboard shortcuts, start transcribing, put the transcribed text at the user's cursor, and wrap all of this in a
nice UI. That's a lot. So I broke it down into smaller tasks. First, I created an executable that would just download a model, nothing else.
Then I created another one that would just record voice, nothing else. Then another one that would just transcribe pre-recorded audio. I
completed them one by one like that before combining them at the end.
Highly related to this: your problem-solving skills and software engineering skills are still highly relevant in the world of agentic coding and
Claude Code. It's able to solve a lot of problems on its own, but when you apply your general problem-solving and software engineering
skills to it, it becomes a lot more powerful.
https://github.com/ykdojo/claude-code-tips 13/46

## Page 14

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Tip 4: Using Git and GitHub CLI like a pro
Just ask Claude to handle your Git and GitHub CLI tasks. This includes committing (so you don't have to write commit messages manually),
branching, pulling, and pushing.
I personally allow pull automatically but not push, because push is riskier - it doesn't contaminate the origin if something goes wrong with
a pull.
For GitHub CLI ( gh ), there's a lot you can do. One thing I started doing more after using Claude Code is creating draft PRs. This lets Claude
Code handle the PR creation process with low risk - you can review everything before marking it ready for review.
And it turns out, gh is pretty powerful. You can even send arbitrary GraphQL queries through it. For example, you can even find the exact
times at which GitHub PR descriptions were edited:
⏺ Bash(gh api graphql -f query='
query {
repository(owner: "...", name: "...") {
pullRequest(number: ...) {
userContentEdits(first: 100) {
nodes { editedAt editor { login } }
}
}
}
}')
⏺ Here's the full edit history for your PR description:
| # | Edited At (UTC) | Editor |
|----|---------------------|--------|
| 1 | 2025-12-01 00:08:34 | ykdojo |
| 2 | 2025-12-01 15:57:21 | ykdojo |
| 3 | 2025-12-01 16:24:33 | ykdojo |
| 4 | 2025-12-01 16:27:00 | ykdojo |
| 5 | 2025-12-04 00:40:02 | ykdojo |
...
https://github.com/ykdojo/claude-code-tips 14/46

## Page 15

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Disable commit/PR attribution
By default, Claude Code adds a Co-Authored-By trailer to commits and an attribution footer to PRs. You can disable both by adding this to
~/.claude/settings.json :
{
"attribution": {
"commit": "",
"pr": "",
"sessionUrl": false
}
}
Setting commit and pr to empty strings removes the attribution text entirely. This replaces the older includeCoAuthoredBy setting, which
is now deprecated.
sessionUrl is a separate flag (default true ): Claude Code also adds a Claude-Session: trailer to commits and a session link to PR bodies.
Set it to false to turn that off.
Tip 5: AI context is like milk; it's best served fresh and condensed!
When you start a new conversation with Claude Code, it performs the best because it doesn't have all the added complexity of having to
process the previous context from earlier parts of the conversation. But as you talk to it longer and longer, the context gets longer and the
performance tends to go down.
So it's best to start a new conversation for every new topic, or if the performance starts to go down.
Tip 6: Getting output out of your terminal
Sometimes you want to copy and paste Claude Code's output, but copying directly from the terminal isn't always clean. Here are a few
ways to get content out more easily:
/copy command: The simplest option - just type /copy to copy Claude's last response to your clipboard as markdown
Clipboard directly: On Mac or Linux, ask Claude to use pbcopy to send output straight to your clipboard
https://github.com/ykdojo/claude-code-tips 15/46

## Page 16

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Write to a file: Have Claude put the content in a file, then ask it to open it in VS Code (or your favorite editor) so you can copy from
there. You can also specify a line number, so you can ask Claude to open the specific line it just edited. For markdown files, once it's
open in VS Code, you can use Cmd+Shift+P (or Ctrl+Shift+P on Linux/Windows) and select "Markdown: Open Preview" to see the
rendered version
Opening URLs: If there's a URL you want to examine yourself, ask Claude to open it in your browser. On Mac, you can ask it to use the
open command, but in general asking to open in your favorite browser should work on any platform
GitHub Desktop: You can ask Claude to open the current repo in GitHub Desktop. This is particularly useful when it's working in a non-
root directory - for example, if you asked it to create a git worktree in a different directory and you haven't opened Claude Code from
there yet
You can combine some of these together too. For example, if you want to edit a GitHub PR description, instead of having Claude edit it
directly (which it might mess up), you can have it copy the content into a local file first. Let it edit that, check the result yourself, and once it
looks good, have it copy and paste it back into the GitHub PR. That works really well. Or if you want to do that yourself, you can just ask it
to open it in VS Code or give it to you via pbcopy so you can copy and paste it manually.
Of course, you can run these commands yourself, but if you find yourself doing it repetitively, it's helpful to let Claude run them for you.
Tip 7: Set up terminal aliases for quick access
Since I use the terminal more because of Claude Code, I found it helpful to set up short aliases so I can launch things quickly. Here are the
ones I use:
c for Claude Code (this is the one I use the most)
ch for Claude Code with Chrome integration
cr for claude remote-control , to start a server you can drive from your phone
gb for GitHub Desktop
co for VS Code
q for going to the project directory where I have most projects. From there I can manually cd into an individual folder to work on that
project, or I can just launch Claude Code with c to let it basically have access to any project it needs to access.
To set these up, add lines like this to your shell config file ( ~/.zshrc or ~/.bashrc ):
https://github.com/ykdojo/claude-code-tips 16/46

## Page 17

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
alias c='claude'
alias ch='claude --chrome'
alias cr='claude remote-control'
alias gb='github'
alias co='code'
alias q='cd ~/Desktop/projects'
Once you have these aliases, you can combine them with flags: c -c continues your last conversation, and c -r shows a list of recent
conversations to resume. These work with ch too ( ch -c , ch -r ) for Chrome sessions.
Tip 8: Proactively compact your context
There's a /compact command in Claude Code that summarizes your conversation to free up context space. Automatic compaction also
happens when the full available context is filled. The total available context window for Opus 4.5 is currently 200k, and 45k of that is
reserved for automatic compaction. About 10% of the total 200k is automatically filled with the system prompt, tools, memory, and
dynamic context. But I found that it's better to proactively do it and manually tune it. I turned off auto-compact with /config so I have
more context available for the main conversation and more control over when and how compaction happens.
The way I do this is to ask Claude to write a handoff document before starting fresh. Something like:
Put the rest of the plan in the system-prompt-extraction folder as HANDOFF.md. Explain what you have tried, what worked, what
didn't work, so that the next agent with fresh context is able to just load that file and nothing else to get started on this task and finish
it up.
Claude will create a file summarizing the current state of work:
⏺ Write(experiments/system-prompt-extraction/HANDOFF.md)
⎿ Wrote 129 lines to experiments/system-prompt-extraction/HANDOFF.md
# System Prompt Slimming - Handoff Document
## Goal
Reduce Claude Code's system prompt by ~45% (currently at 11%, need ~34% more).
## Current Progress
### What's Been Done
- **Backup/restore system**: `backup-cli.sh` and `restore-cli.sh` with SHA256 verification
https://github.com/ykdojo/claude-code-tips 17/46

## Page 18

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
- **Patch system**: `patch-cli.js` that restores from backup then applies patches
...
After Claude writes it, review it quickly. If something's missing, ask for edits:
Did you add a note about iteratively testing instead of trying to do everything all at once?
Then start a fresh conversation. For the fresh agent, you can just give the path of the file and nothing else like this, and it should work just
fine:
> experiments/system-prompt-extraction/HANDOFF.md
In subsequent conversations, you can ask the agent to update the document for the next agent.
I've also created a /handoff slash command that automates this - it checks for an existing HANDOFF.md, reads it if present, then creates
or updates it with the goal, progress, what worked, what didn't, and next steps. You can find it in the skills folder, or install it via the dx
plugin.
Alternative: Use plan mode
Another option is to use plan mode. Enter it with /plan or Shift+Tab. Ask Claude to gather all the relevant context and create a
comprehensive plan for the next agent:
I just enabled plan mode. Bring over all of the context that you need for the next agent. The next agent will not have any other
context, so you'll need to be pretty comprehensive.
Claude will explore the codebase, gather context, and write a detailed plan. When it's done, you'll see options like:
Would you like to proceed?
❯ 1. Yes, clear context and auto-accept edits (shift+tab)
2. Yes, auto-accept edits
3. Yes, manually approve edits
4. Type here to tell Claude what to change
https://github.com/ykdojo/claude-code-tips 18/46

## Page 19

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Option 1 clears the previous context and starts fresh with the plan. The new Claude instance sees only the plan, so it can focus without the
baggage of the old conversation. It also gets a link to the old transcript file in case it needs to look up specific details.
Tip 9: Complete the write-test cycle for autonomous tasks
If you want Claude Code to run something autonomously, like git bisect , you need to give it a way to verify results. The key is
completing the write-test cycle: write code, run it, check the output, and repeat.
For example, let's say you're working on Claude Code itself and you notice /compact stopped working and started throwing a 400 error. A
classic tool to find the exact commit that caused this is git bisect . The nice thing is you can let Claude Code run bisect on itself, but it
needs a way to test each commit.
For tasks that involve interactive terminals like Claude Code, you can use tmux. The pattern is:
1. Start a tmux session
2. Send commands to it
3. Capture the output
4. Verify it's what you expect
Here's a simple example of testing if /context works:
tmux kill-session -t test-session 2>/dev/null
tmux new-session -d -s test-session
tmux send-keys -t test-session 'claude' Enter
sleep 2
tmux send-keys -t test-session '/context' Enter
sleep 1
tmux capture-pane -t test-session -p
Once you have a test like this, Claude Code can run git bisect and automatically test each commit until it finds the one that broke
things.
This is also an example of why your software engineering skills still matter. If you're a software engineer, you probably know about tools
like git bisect . That knowledge is still really valuable when working with AI - you just apply it in new ways.
https://github.com/ykdojo/claude-code-tips 19/46

## Page 20

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Another example is simply writing tests. After you let Claude Code write some code, if you want to test it, you can just let it write tests for
itself too. And let it run on its own and fix things if it can. Of course, it doesn't always go in the right direction and you need to supervise it
sometimes, but it's able to do a surprising amount of coding tasks on its own.
Creative testing strategies
Sometimes you need to be creative with how you complete the write-test cycle. For example, if you're building a web app, you could use
Playwright MCP, Chrome DevTools MCP, or Claude's native browser integration (through /chrome ). I haven't tried Chrome DevTools yet,
but I've tried Playwright and Claude's native integration. Overall, Playwright generally works better. It does use a lot of context, but the
200k context window is normally enough for a single task or a few smaller tasks.
The main difference between these two seems to be that Playwright focuses on the accessibility tree (structured data about page elements)
rather than taking screenshots. It does have the ability to take screenshots, but it doesn't normally use them to take actions. On the other
hand, Claude's native browser integration focuses more on taking screenshots and clicking on elements by specific coordinates. It can click
on random things sometimes, and the whole process can be slow.
This might improve over time, but by default I would go with Playwright for most tasks that aren't visually intensive. I'd only use Claude's
native browser integration if I need to use a logged-in state without having to provide credentials (since it runs in your own browser
profile), or if it specifically needs to click on things visually using their coordinates.
This is why I disable Claude's native browser integration by default and use it through the ch shortcut I defined previously. That way
Playwright handles most browser tasks, and I only enable Claude's native integration when I specifically need it.
Additionally, you can ask it to use accessibility tree refs instead of coordinates. Here's what I put in my CLAUDE.md for this:
# Claude for Chrome
- Use `read_page` to get element refs from the accessibility tree
- Use `find` to locate elements by description
- Click/interact using `ref`, not coordinates
- NEVER take screenshots unless explicitly requested by the user
https://github.com/ykdojo/claude-code-tips 20/46

## Page 21

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
In my personal experience, I've also had a situation where I was working on a Python library (Daft) and needed to test a version I built
locally on Google Colab. The trouble is it's hard to build a Python library with a Rust backend on Google Colab - it doesn't seem to work
that well. So I needed to actually build a wheel locally and then upload it manually so that I could run it on Google Colab. I also tried
monkey patching, which worked well in the short term before I had to wait for the whole wheel to build locally. I came up with these
testing strategies and executed them by going back and forth with Claude Code.
Another situation I encountered is I needed to test something on Windows but I'm not running a Windows machine. My CI tests on the
same repo were failing because we had some issues with Rust on Windows, and I had no way of testing locally. So I needed to create a
draft PR with all the changes, and another draft PR with the same changes plus enabling Windows CI runs on non-main branches. I
instructed Claude Code to do all of that, and then I tested the CI directly in that new branch.
Tip 10: Cmd+A and Ctrl+A are your friends
I've been saying this for a few years now: Cmd+A and Ctrl+A are friends in the world of AI. This applies to Claude Code too.
Sometimes you want to give Claude Code a URL, but it can't access it directly. Maybe it's a private page (not sensitive data, just not publicly
accessible), or something like a Reddit post that Claude Code has trouble fetching. In those cases, you can just select all the content you
see (Cmd+A on Mac, Ctrl+A on other platforms), copy it, and paste it directly into Claude Code. It's a pretty powerful method.
This works great for terminal output too. When I have output from Claude Code itself or any other CLI application, I can use the same trick:
select all, copy, and paste it back to CC. Pretty helpful.
Some pages don't lend themselves well to select all by default - but there are tricks to get them into a better state first. For example, with
Gmail threads, click Print All to get the print preview (but cancel the actual print). That page shows all emails in the thread expanded, so
you can Cmd+A the entire conversation cleanly. For asking questions about a YouTube video or summarizing it, you can click "Show
transcript" on a YouTube video and then do Cmd+A or Ctrl+A.
This applies to any AI, not just Claude Code.
Tip 11: Invest in your own workflow
Personally, I've created my own voice transcription app from scratch with Swift. I created my own custom status line from scratch using
Claude Code, this one with bash.
https://github.com/ykdojo/claude-code-tips 21/46

## Page 22

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
But you don't have to go overboard like that. Just taking care of your own CLAUDE.md, making sure it's as concise as possible while being
able to help you achieve your goals - stuff like that is helpful. And of course, learning these tips, learning these tools, and some of the most
important features.
All of these are investments in the tools you use to build whatever you want to build. I think it's important to spend at least a little bit of
time on that.
Tip 12: Search through your conversation history
You can ask Claude Code about your past conversations, and it'll help you find and search through them. Your conversation history is
stored locally in ~/.claude/projects/ , with folder names based on the project path (slashes become dashes).
For example, conversations for a project at /Users/yk/Desktop/projects/claude-code-tips would be stored in:
~/.claude/projects/-Users-yk-Desktop-projects-claude-code-tips/
Each conversation is a .jsonl file. You can search through them with basic bash commands:
# Find all conversations mentioning "Reddit"
grep -l -i "reddit" ~/.claude/projects/-Users-yk-Desktop-projects-*/*.jsonl
# Find today's conversations about a topic
find ~/.claude/projects/-Users-yk-Desktop-projects-*/*.jsonl -mtime 0 -exec grep -l -i "keyword" {} \;
# Extract just the user messages from a conversation (requires jq)
cat ~/.claude/projects/.../conversation-id.jsonl | jq -r 'select(.type=="user") | .message.content'
Or just ask Claude Code directly: "What did we talk about regarding X today?" and it'll search through the history for you.
Tip 13: Multitasking with terminal tabs
When running multiple Claude Code instances, staying organized is more important than any specific technical setup like Git worktrees. I
recommend focusing on at most three or four tasks at a time.
https://github.com/ykdojo/claude-code-tips 22/46

## Page 23

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
My personal method is what I would call a "cascade" - whenever I start a new task, I just open a new tab on the right. Then I sweep left to
right, left to right, going from oldest tasks to newest. The general direction stays consistent, except when I need to check on certain tasks,
get notifications, etc.
Here's what my setup typically looks like:
In this example:
1. Leftmost tab - A persistent tab running my voice transcription system (always stays here)
2. Second tab - Setting up a Docker container
https://github.com/ykdojo/claude-code-tips 23/46

## Page 24

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
3. Third tab - Checking disk usage on my local machine
4. Fourth tab - Working on an engineering project
5. Fifth tab (current) - Writing this very tip
Tip 14: Git worktrees for parallel branch work
If you're working on multiple things at the same time in the same project and you don't want them to get conflicted, Git worktrees are a
great way to do that. You can just ask Claude Code to create a git worktree and start working on it there - you don't have to worry about
the specific syntax.
The basic idea is that you can work on a different branch in a different directory. It's essentially a branch + a directory.
You can add this layer of Git worktrees on top of the cascade method I discussed in the multitasking tip.
What are git worktrees?
A git worktree is just like any other git branch, but with a new directory specifically assigned to it.
So if you're working on, let's say, the main branch and feature-branch-1, then without git worktrees, you can only work on them one at a
time because your project folder can only be set to one branch at a time.
However, with a git worktree, you can keep working on the main branch (or any other branch for that matter) in the original project folder,
and at the same time work on feature-branch-1 in a new folder.
https://github.com/ykdojo/claude-code-tips 24/46

## Page 25

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Tip 15: Manual exponential backoff for long-running jobs
When waiting on long-running jobs like Docker builds or GitHub CI, you can ask Claude Code to do manual exponential backoff.
Exponential backoff is a common technique in software engineering, but you can apply it here too. Ask Claude Code to check the status
with increasing sleep intervals - one minute, then two minutes, then four minutes, and so on. It's not programmatically doing it in the
traditional sense - the AI is doing it manually - but it works pretty well.
https://github.com/ykdojo/claude-code-tips 25/46

## Page 26

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
This way the agent can continuously check the status and let you know once it's done.
(For GitHub CI specifically, gh run watch exists but outputs many lines continuously, which wastes tokens. Manual exponential backoff
with gh run view <run-id> | grep <job-name> is actually more token-efficient. This is also a general technique that works well even when
you don't have a dedicated wait command handy.)
For example, if you have a Docker build running in the background:
And it keeps going until the job completes.
https://github.com/ykdojo/claude-code-tips 26/46

## Page 27

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Tip 16: Claude Code as a writing assistant
Claude Code is an excellent writing assistant and partner. The way I use it for writing is I first give it all the context about what I'm trying to
write, and then I give it detailed instructions by speaking to it using my voice. That gives me the first draft. If it's not good enough, I try a
few times.
Then I go through it line by line, pretty much. I say okay, let's take a look at it together. I like this line for these reasons. I feel like this line
needs to move over there. This line needs to change in this particular way. I might ask about reference materials as well.
So it's this sort of back-and-forth process, maybe with the terminal on the left and your code editor on the right:
https://github.com/ykdojo/claude-code-tips 27/46

## Page 28

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
That tends to work really well.
Tip 17: Markdown is the s**t
Typically when people write a new document, they might use something like Google Docs or maybe Notion. But now I honestly think the
most efficient way to go about it is markdown.
https://github.com/ykdojo/claude-code-tips 28/46

## Page 29

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Markdown was already pretty good even before AI, but with Claude Code in particular, because it's so efficient as I mentioned with regards
to writing, it makes the value of markdown higher in my opinion. Whenever you want to write a blog post or even a LinkedIn post, you can
just talk to Claude Code, have it be saved as markdown, and then go from there.
A quick tip for this one: if you want to copy and paste markdown content into a platform that doesn't accept it easily, you can paste it into
a fresh Notion file first, then copy from Notion into the other platform. Notion converts it to a format that other platforms can accept. If
regular pasting doesn't work, try Command + Shift + V to paste without formatting.
Tip 18: Use Notion to preserve links when pasting
It turns out the reverse also works. If you have text with links from other places, let's say from Slack, you can copy it. If you paste it directly
into Claude Code, it doesn't show the links. But if you put it in a Notion document first, then copy from there, you get it in markdown,
which of course Claude Code can read.
Tip 19: Isolated environments for long-running risky tasks
Isolated environments are great for --dangerously-skip-permissions sessions where you don't have to give permission for each little
thing. You can just let it run on its own for a while. This is useful for research or experimentation, things that take a long time and maybe
could be risky.
There are two major ways of going about it:
1. You can run it in a container. I even created a preset environment to make running containerized Claude Code sessions easy.
2. You can take it a step further by setting up a whole machine Claude Code can fully control, computer use included.
There's also auto mode, which is a sensible default in general - Claude runs autonomously while a classifier reviews each command and
only stops for risky ones. But this still doesn't remove the risks and the need for approval entirely, so for tasks where you want it to have
complete independence, you can still use a container.
Advanced: Orchestrating a worker Claude Code in a container
You can take this further by having your local Claude Code control another Claude Code instance running inside a container. The trick is
using tmux as the control layer:
https://github.com/ykdojo/claude-code-tips 29/46

## Page 30

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
1. Your local Claude Code starts a tmux session
2. In that tmux session, it runs or connects to the container
3. Inside the container, Claude Code runs with --dangerously-skip-permissions
4. Your outer Claude Code uses tmux send-keys to send prompts and capture-pane to read output
This gives you a fully autonomous "worker" Claude Code that can run experimental or long-running tasks without you approving every
action. When it's done, your local Claude Code can pull the results back. If something goes wrong, it's all sandboxed in the container.
Advanced: Multi-model orchestration
Beyond just Claude Code, you can run different AI CLIs in containers - Codex, Antigravity CLI, or others. I tried OpenAI Codex for code
review, and it works well. The point isn't that you can't run these CLIs directly on your host machine - you obviously can. The value is that
Claude Code's UI/UX is smooth enough that you can just talk to it and let it handle the orchestration: spinning up different models,
sending data between containers and your host. Instead of manually switching between terminals and copy-pasting, Claude Code becomes
the central interface that coordinates everything.
Tip 20: The best way to get better at using Claude Code is by using it
Recently I saw a world-class rock climber being interviewed by another rock climber. She was asked, "How do you get better at rock
climbing?" She simply said, "By rock climbing."
That's how I feel about this too. Of course, there are supplementary things you can do, like watching videos, reading books, learning about
tips. But using Claude Code is the best way to learn how to use it. Using AI in general is the best way to learn how to use AI.
I like to think of it like a billion token rule instead of the 10,000 hour rule. If you want to get better at AI and truly get a good intuition
about how it works, the best way is to consume a lot of tokens. And nowadays it's possible. I found that especially with Opus 4.5, it's
powerful enough but affordable enough that you can run multiple sessions at the same time. You don't have to worry as much about token
usage, which frees you up a lot.
Tip 21: Fork and half-clone conversations
Sometimes you want to try a different approach from a specific point in a conversation without losing your original thread. Claude Code
has native forking:
https://github.com/ykdojo/claude-code-tips 30/46

## Page 31

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
/branch - branches the current session from within a conversation
--fork-session - use with --resume or --continue (e.g., claude -c --fork-session )
Since --fork-session has no short form, you can add this function to your ~/.zshrc or ~/.bashrc to use --fs as a shortcut:
claude() {
local args=()
for arg in "$@"; do
if [[ "$arg" == "--fs" ]]; then
args+=("--fork-session")
else
args+=("$arg")
fi
done
command claude "${args[@]}"
}
This intercepts all claude commands, expands --fs to --fork-session , and passes everything else through unchanged. Works with
aliases too (see Tip 7): c -c --fs , ch -c --fs , etc.
Half-clone to reduce context
When a conversation gets too long, the half-clone-conversation script keeps only the later half. This reduces token usage while preserving
your recent work. The first message is tagged with [HALF-CLONE <timestamp>] (e.g., [HALF-CLONE Jan 7 14:30] ). There's also a quarter-
clone variant ( --quarter , or the quarter-clone skill) that keeps only the last quarter, tagged with [QUARTER-CLONE <timestamp>] - useful
when even half is too much.
To set it up manually, symlink the script and skills:
ln -s /path/to/this/repo/scripts/half-clone-conversation.sh ~/.claude/scripts/half-clone-conversation.sh
ln -s /path/to/this/repo/skills/half-clone ~/.claude/skills/half-clone
ln -s /path/to/this/repo/skills/quarter-clone ~/.claude/skills/quarter-clone
Or install via the dx plugin - no symlinks needed.
https://github.com/ykdojo/claude-code-tips 31/46

## Page 32

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Auto-suggest half-clone with a hook
Optionally, you can use a hook to automatically trigger /half-clone when your context gets too long. The check-context script runs after
every Claude response and checks context usage. If it's over 85%, it tells Claude to run /half-clone , which creates a new conversation
with only the later half so a new agent can continue there.
To set it up, first copy the script:
cp /path/to/this/repo/scripts/check-context.sh ~/.claude/scripts/check-context.sh
chmod +x ~/.claude/scripts/check-context.sh
Then add the hook to your ~/.claude/settings.json :
{
"hooks": {
"Stop": [
{
"hooks": [
{
"type": "command",
"command": "~/.claude/scripts/check-context.sh"
}
]
}
]
}
}
This requires auto-compact to be disabled ( /config > Auto-compact > false), otherwise Claude Code may compact the context before the
hook gets a chance to fire. When triggered, the hook blocks Claude from stopping and tells it to run /half-clone . The advantage over
auto-compact is that half-clone is deterministic and fast - it keeps your actual messages intact instead of summarizing them.
Recommended permission for the half-clone script
https://github.com/ykdojo/claude-code-tips 32/46

## Page 33

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
The half-clone script needs to read ~/.claude (for conversation files and history). To avoid permission prompts from any project, add this
to your global settings ( ~/.claude/settings.json ):
{
"permissions": {
"allow": ["Read(~/.claude)"]
}
}
Tip 22: Use realpath to get absolute paths
When you need to tell Claude Code about files in a different folder, use realpath to get the full absolute path:
realpath some/relative/path
Tip 23: Understanding CLAUDE.md vs Skills vs Slash Commands vs Plugins
These are somewhat similar features and I initially found them pretty confusing. I've been unpacking them and trying my best to wrap my
head around them, so I wanted to share what I learned.
CLAUDE.md is the simplest one. It's a bunch of files that get treated as the default prompt, loaded into the beginning of every
conversation no matter what. The nice thing about it is the simplicity. You can explain what the project is about in a particular project
( ./CLAUDE.md ) or globally ( ~/.claude/CLAUDE.md ).
Skills are like better-structured CLAUDE.md files. They can be invoked by Claude automatically when relevant, or manually by the user with
a slash (e.g., /my-skill ). For example, you could have a skill that opens a Google Translate link with proper formatting when you ask how
to pronounce a word in a certain language. If those instructions are in a skill, they only load when needed. If they were in CLAUDE.md,
they'd already be there taking up space. So skills are more token-efficient in theory.
Slash Commands are similar to skills in that they're ways of packaging instructions separately. They can be invoked manually by the user,
or by Claude itself. If you need something more precise, to invoke at the right time at your own pace, slash commands are the tool to use.
https://github.com/ykdojo/claude-code-tips 33/46

## Page 34

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Skills and slash commands are pretty similar in the way they function. The difference is the intention of the design - skills are primarily
designed for Claude to use, and slash commands are primarily designed for the user to use. However, they have ended up merging them,
as I had suggested this change.
Plugins are a way to package skills, slash commands, agents, hooks, and MCP servers together. But a plugin doesn't have to use all of
them. Anthropic's official frontend-design plugin is essentially just a skill and nothing else. It could be distributed as a standalone skill, but
the plugin format makes it easier to install.
For example, I built a plugin called dx that bundles skills from this repo together. You can see how it works in the Install the dx plugin
section.
Tip 24: Interactive PR reviews
Claude Code is great for PR reviews. The procedure is pretty simple: you ask it to retrieve PR information using the gh command, and then
you can go through the review however you want.
You can do a general review, or go file by file, step by step. You control the pace. You control how much detail you want to look into and
the level of complexity you want to work at. Maybe you just want to understand the general structure, or maybe you want to have it run
tests too.
The key difference is that Claude Code acts as an interactive PR reviewer, not just a one-shot machine. Some AI tools are good at one-shot
reviews (including the latest GPT models), but with Claude Code you can have a conversation.
Tip 25: Claude Code as a research tool
Claude Code is amazing for any sort of research. It's essentially a Google replacement or deep research replacement, but more advanced in
a few different ways. Whether you're researching why certain GitHub Actions failed (which I've been doing a lot recently), doing sentiment
or market analysis on Reddit, exploring your codebase, or exploring public information to find something - it's able to do that.
The key is giving it the right pieces of information and instructions about how to access those pieces of information. It might be gh
terminal command access, or the container approach (Tip 19), or Reddit through the reddit-fetch skill, or private information through an
MCP like Slack MCP, or the Cmd+A / Ctrl+A method (Tip 10) - whatever it is. Additionally, if Claude Code has trouble loading certain URLs,
you can try using Playwright MCP or Claude's native browser integration (see Tip 9). For scientific research, I created a paper-search plugin
for searching academic papers.
https://github.com/ykdojo/claude-code-tips 34/46

## Page 35

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
In fact, I was even able to save $10,000 by using Claude Code for research.
Tip 26: Mastering different ways of verifying its output
One way to verify its output if it's code is to have it write tests and make sure the tests look good in general. That's one way, but you can of
course check the code it generates as it goes, just on the Claude Code UI. Another thing is you can use a visual Git client like GitHub
Desktop for example. I personally use it. It's not a perfect product, but it's good enough for checking changes quickly. And having it
generate a PR as I probably mentioned earlier in this post is a great way as well. Have it create a draft PR, check the content before turning
it into a real PR.
Another one is letting it check itself, its own work. If it gives you some sort of output, let's say from some research, you can say "are you
sure about this? Can you double check?" One of my favorite prompts is to say "double check everything, every single claim in what you
produced and at the end make a table of what you were able to verify" - and that seems to work really well.
Tip 27: Claude Code as a DevOps engineer
I wanted to specifically create a separate tip for this because it's been really amazing for me. Whenever there are GitHub Actions CI failures,
I just give it to Claude Code and say "dig into this issue, try to find the root cause." Sometimes it gives you surface level answers, but if you
just keep asking - was it caused by a particular commit, a particular PR, or is it a flaky issue? - it really helps you dig into these nasty issues
that are hard to dig into by hand. You would need to wade through a bunch of logs and that would be super painful to do manually, but
Claude Code is able to handle a lot of that.
I've packaged this workflow as a /gha slash command - just run /gha <url> with any GitHub Actions URL and it will automatically
investigate the failure, check for flakiness, identify breaking commits, and suggest fixes. You can find it in the skills folder, or install it via the
dx plugin.
Once you identify what the particular problem was, you can just create a draft PR and go through some of the tips I mentioned earlier -
check the output, make sure it looks good, let it verify its own outputs, and then turn it into a real PR to actually fix the issue. It's been
working really well for me personally.
https://github.com/ykdojo/claude-code-tips 35/46

## Page 36

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Tip 28: Keep CLAUDE.md simple and review it periodically
It's important to keep CLAUDE.md simple and as concise as possible. You can just start with no CLAUDE.md at all. And if you find that you
keep telling Claude Code the same thing over and over again, then you can just add it to CLAUDE.md. I know there is an option to do that
through the # symbol, but I prefer to just ask Claude Code to either add it to the project level CLAUDE.md or the global CLAUDE.md and
it'll know what to edit exactly.
https://github.com/ykdojo/claude-code-tips 36/46

## Page 37

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
It's also important to periodically review your CLAUDE.md files because they can get outdated over time. Instructions that made sense
some time ago might no longer be relevant, or you might have new patterns that should be documented. I created a skill for this called
review-claudemd that analyzes your recent conversations and suggests improvements for your CLAUDE.md files.
Tip 29: Claude Code as the universal interface
I used to think with Claude Code, CLI is like the new IDE, and it's still true in a way. I think it's a great first place to open your project
whenever you want to make quick edits and stuff like that. But depending on the severity of your project, you want to be more careful
about the outputs than just staying at the vibe coding level.
But what's also true, the more general case of that, is that Claude Code is really the universal interface to your computer, the digital world,
any sort of digital problem that you have. You can let it figure it out in many cases. For example, if you need to do a quick edit of your
video, you can just ask it to do that - it'll probably figure out how to do that through ffmpeg or something similar. If you want to transcribe
a bunch of audio files or video files that you have locally, you can just ask it to do that - it might suggest to use Whisper through Python. If
you want to analyze some data that you have in a CSV file, it might suggest to use Python or JavaScript to visualize that. And of course
with internet access - Reddit, GitHub, MCPs - the possibilities are endless.
It's also great for any operations you want to perform on your local computer. For example, if you're running out of storage, you can just
ask it to give you some advice on how to clean that up. It'll look through your local folders and files, try to find what's taking up a lot of
space, and then give you advice on how to clean them up - maybe delete particularly large files. In my case, I had some Final Cut Pro files
that were really large that I should have cleaned up. Claude Code told me about it. Maybe it'll tell you to clean up unused Docker images
and containers using docker system prune . Or maybe it'll tell you to clean up some cache that you never realized was still there. No matter
what you want to do on your computer, Claude Code is the first place I go to now.
I think it's kind of interesting because the computer started with a text interface. And we're, in a way, coming back to this text interface that
you can spin up three or four tabs at a time, as I mentioned earlier. To me, that's really exciting. It feels like you have a second brain, in a
way. But because of the way it's structured, because it's just a terminal tab, you can open up a third brain, a fourth brain, a fifth brain, a
sixth brain. And as the models become more powerful, the proportion of the thinking that you can delegate to these things - not the
important things, but things that you don't want to do or that you find boring or too tedious - you can just let them take care of it. As I
mentioned, a good example of that is looking into GitHub Actions. Who wants to do that? But it turns out these agents are really good at
those boring tasks.
https://github.com/ykdojo/claude-code-tips 37/46

## Page 38

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Tip 30: It's all about choosing the right level of abstraction
As I mentioned earlier, sometimes it's okay to stay at the vibe coding level. You don't necessarily have to worry about every single line of
code if you're working on one-time projects or non-critical parts of the codebase. But other times, you want to dig in a little deeper - look
at the file structure and functions, individual lines of code, even checking dependencies.
https://github.com/ykdojo/claude-code-tips 38/46

## Page 39

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
https://github.com/ykdojo/claude-code-tips 39/46

## Page 40

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
The key is that it's not binary. Some people say vibe coding is bad because you don't know what you're doing, but sometimes it's totally
fine. But other times, it is helpful to dig deeper, use your software engineering skills, understand code at a granular level, or copy and paste
parts of the codebase or specific error logs to ask Claude Code specific questions about them.
It's sort of like you're exploring a giant iceberg. If you want to stay at the vibe coding level, you can just fly over the top and check it from
far away. Then you can go a little bit closer. You can go into diving mode. You can go deeper and deeper, with Claude Code as your guide.
Tip 31: Use auto mode
Auto mode lets Claude decide whether a command is safe to run in context, instead of asking you to approve every single one. (You can
cycle to it with shift+tab.) I've been using it for a while and it's been working really well so far.
The main thing it fixes is mindless approving. When a command is too long to read carefully, or you're getting tired, you end up approving
things without really thinking about them. Auto mode takes that pressure off, so I think it's a good default.
If you still want to be careful, you can always approve things manually without auto mode. And if you want to give it complete
independence, you can run Claude Code in a container with --dangerously-skip-permissions .
Tip 32: Control Claude Code from your phone
Remote Control lets you drive Claude Code from your phone, which pairs really well with auto mode - you can kick something off, walk
away, and check on it from anywhere. There are a couple of ways to use it.
Run /remote-control inside an existing session, follow the instructions, and you can drive that same session from your phone. Because it's
the same session, you can go back and forth between your phone and your computer. You can also use /rc for short.
Or start a server with claude remote-control --spawn=worktree --capacity=N , which lets you start brand new sessions from your phone,
not just attach to one you already have open. Here --spawn=worktree gives each new session its own git worktree so they don't step on
each other, and --capacity sets how many can run at once. I have this aliased to cr , so it's just cr --spawn=worktree --capacity=N .
https://github.com/ykdojo/claude-code-tips 40/46

## Page 41

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Personally I prefer the /rc method, and I turn it off when I'm not using it. A potential attacker who gets access to your Claude Code
session essentially has access to everything on your computer, so I'd rather be careful. The exception is when I have a totally isolated
environment - then it's super convenient to be able to start a Claude Code session from anywhere from your phone, with access to your
full dev environment.
One thing to watch out for: if "Enable Remote Control for all sessions" is unset, it could be enabled automatically for every new session. Set
it to false explicitly if you don't want that, either through /config or with "remoteControlAtStartup": false in ~/.claude/settings.json .
Docs: Remote Control.
Tip 33: Learn to use artifacts
If you're building a front-end app with HTML, CSS, and JavaScript, an artifact is a great way to check your output quickly and even share it.
Ask Claude Code to put the page in an artifact, and it publishes it to claude.ai and gives you a link.
The nice thing about it is that it's gated behind your Anthropic login: a new artifact is only visible to you, so you can check it privately or
share it privately.
It works great from your phone as well. In the Claude mobile app, tap the artifact card and it opens right there in the app.
One thing to keep in mind: an artifact is a single self-contained page with no backend, and external requests are blocked - so if your HTML
pulls a library from a CDN, bundle it into the file first.
Tip 34: Write lots of tests (and use TDD)
As you write more code with Claude Code, it becomes easier to make mistakes. PR reviews and visual Git clients help catch issues (as I
mentioned earlier), but writing tests is crucial as your codebase grows larger.
You can have Claude Code write tests for its own code. Some people say AI can't test its own work, but it turns out it can - similar to how
the human brain works. When you write tests, you're thinking about the same problem in a different way. The same applies to AI.
I've found that TDD (Test-Driven Development) works really well with Claude Code:
1. Write tests first
2. Make sure they fail
https://github.com/ykdojo/claude-code-tips 41/46

## Page 42

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
3. Commit the tests
4. Write the code to make them pass
By writing failing tests first and committing them before implementation, you create a clear contract for what the code should do. Claude
Code then has a concrete target to hit, and you can verify the implementation is correct by running the tests.
If you want to be extra sure, review the tests yourself to make sure they don't do anything stupid like just returning true.
Tip 35: Be braver in the unknown; iterative problem solving
Since I started using Claude Code more intensely, I've noticed that I became more and more brave in the unknown.
For example, when I started working at Daft, I noticed a problem with our frontend code. I'm not an expert in React, but I decided to dig
into it anyway. I just started asking questions about the codebase and about the problem. Eventually I was able to solve it because I knew
how to iteratively solve problems with Claude Code.
A similar thing happened recently. I was building a guide for users of Daft and ran into some very specific issues: cloudpickle not working
with Google Colab with Pydantic, and a separate issue with Python and a bit of Rust where things weren't printing correctly in JupyterLab
even though they worked fine in the terminal. I had never worked with Rust before.
I could have just created an issue and let other engineers handle it. But I thought, let me dig into the codebase. Claude Code came up with
an initial solution, but it wasn't that good. So I slowed down. A colleague suggested we just disable that part, but I didn't want any
regression. Can we find a better solution?
What followed was a collaborative and iterative process. Claude Code suggested potential root causes and solutions. I experimented with
those. Some turned out to be dead ends, so we went in a different direction. Throughout this, I controlled my pace. Sometimes I went
faster, like when letting it explore different solution spaces or parts of the codebase. Sometimes I went slower, asking "what does this line
mean exactly?" Controlling the level of abstraction, controlling the speed.
Eventually I found a pretty elegant solution. The lesson: even in the world of the unknown, you can do a lot more with Claude Code than
you might think.
https://github.com/ykdojo/claude-code-tips 42/46

## Page 43

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Tip 36: Running bash commands and subagents in the background
When you have a long-running bash command in Claude Code, you can press Ctrl+B to move it to run in the background. Claude Code
knows how to manage background processes - it can check on them later using the BashOutput tool.
This is useful when you realize a command is taking longer than expected and you want Claude to do something else in the meantime. You
can then either have it use the exponential backoff method I mentioned in Tip 15 to check on progress, or just let it work on something
else entirely while the process runs.
Claude Code also has the ability to run subagents in the background. If you need to do long-running research or have an agent check on
something periodically, you don't have to keep it running in the foreground. Just ask Claude Code to run an agent or task in the
background, and it'll handle it while you continue with other work.
Using subagents strategically
Beyond just running things in the background, subagents are useful when you have a large task to break down. For example, if you have a
huge codebase that you need to analyze, you can have subagents analyze it in different ways or look at different parts of the codebase in
parallel. Just ask Claude to spawn multiple subagents to handle different pieces.
You can customize subagents by just asking:
How many - ask Claude to spawn the number you want
Background vs foreground - ask to run them in the background, or press Ctrl+B
Which model - ask for Opus, Sonnet, or Haiku depending on the complexity of each task (subagents default to Sonnet)
Tip 37: The era of personalized software is here
We're entering an era of personalized, custom software. Since AI came out - ChatGPT in general, but especially Claude Code - I've noticed
that I'm able to create a lot more software, sometimes just for myself, sometimes for small projects.
As I mentioned earlier in this document, I've created a custom transcription tool that I use every day to talk to Claude Code. I've created
ways to customize Claude Code itself. I've also done a bunch of data visualization and data analysis tasks using Python much faster than I
could otherwise.
https://github.com/ykdojo/claude-code-tips 43/46

## Page 44

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Here's another example: korotovsky/slack-mcp-server, a popular Slack MCP with almost 1,000 stars, is designed to run as a Docker
container. I had trouble using it smoothly inside my own Docker container (Docker-in-Docker complications). Instead of fighting with that
setup, I just asked Claude Code to write a CLI using Slack's Node SDK directly. It worked really well.
This is an exciting time. Whatever you want to get done, you can ask Claude Code to do it. If it's small enough, you can build it in an hour
or two. I even created a slide deck template - a single HTML file with CSS and JavaScript that lets you embed an interactive, persistent
terminal process inside.
Tip 38: Navigating and editing your input box
Claude Code's input box is designed to emulate common terminal/readline shortcuts, which makes it feel natural if you're used to working
in the terminal. Here are some useful ones:
Navigation:
Ctrl+A - Jump to the beginning of the line
Ctrl+E - Jump to the end of the line
Option+Left/Right (Mac) or Alt+Left/Right - Jump backward/forward by word
Editing:
Ctrl+W - Delete the previous word
Ctrl+U - Delete from cursor to beginning of line
Ctrl+K - Delete from cursor to end of line
Ctrl+C / Ctrl+L - Clear the current input
Ctrl+G - Open your prompt in an external editor (useful for pasting long text, since pasting directly into the terminal can be slow)
If you're familiar with bash, zsh, or other shells, you'll feel right at home.
For Ctrl+G , the editor is determined by your EDITOR environment variable. You can set it in your shell config ( ~/.zshrc or ~/.bashrc ):
export EDITOR=vim # or nano, code, nvim, etc.
Or in ~/.claude/settings.json (requires restart):
https://github.com/ykdojo/claude-code-tips 44/46

## Page 45

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
{
"env": {
"EDITOR": "vim"
}
}
Entering newlines (multi-line input):
The quickest method works everywhere without any setup: type \ followed by Enter to create a newline. For keyboard shortcuts, run
/terminal-setup in Claude Code. On Mac Terminal.app, I use Option+Enter.
Pasting images:
Ctrl+V (Mac/Linux) or Alt+V (Windows) - Paste an image from your clipboard
Note: On Mac, it's Ctrl+V , not Cmd+V .
Tip 39: Spend some time planning, but also prototype quickly
You want to spend enough time planning so that Claude Code knows what to build and how to build it. This means making high-level
decisions early: what technology to use, how the project should be structured, where each functionality should live, which files things
should go in. It's important to make good decisions as early as you can.
Sometimes prototyping helps with that. Just by making a simple prototype quickly, you might be able to say "okay, this technology works
for this particular purpose" or "this other technology works better."
For example, I was recently experimenting with creating a diff viewer. I first tried a simple bash prototype with tmux and lazygit, then tried
making my own git viewer with Ink and Node. I had a lot of trouble with different things and ended up not publishing any of these results.
But what I got reminded of through this project is the importance of planning and prototyping. I found that just by planning a little bit
better at the beginning before you let it write code, you're able to guide it better. You still need to guide it throughout the process of
coding, but letting it plan a little first is really helpful.
You can use plan mode for this by pressing Shift+Tab to switch to it. Or you can just ask Claude Code to make a plan before writing any
code.
https://github.com/ykdojo/claude-code-tips 45/46

## Page 46

8/1/26, 1:03 AM ykdojo/claude-code-tips: 40+ tips for getting the most out of Claude Code, from basics to advanced - includes a custom status line script and Claude Code running itself in a container. …
Tip 40: Simplify overcomplicated code
I've found that Claude Code sometimes overcomplicates things and writes too much code. It makes changes you didn't ask for. It just
seems to have a bias for writing more code. The code might work correctly if you've followed the other tips in this guide, but it's going
to be hard to maintain and hard to check. It can be kind of a nightmare if you don't review it enough.
So sometimes you want to check the code and ask it to simplify things. You could fix things yourself, but you could also just ask it to
simplify. You can ask questions like "why did you make this particular change?" or "why did you add this line?"
Some people say if you write code only through AI, you'll never understand it. But that's only true if you don't ask enough questions. If
you make sure you understand every single thing, you can actually understand code faster than otherwise because you can ask AI about
it. Especially when you're working on a large project.
Note that this applies to prose as well. Claude Code often tries to summarize previous paragraphs in the last paragraph, or previous
https://github.com/ykdojo/claude-code-tips 46/46

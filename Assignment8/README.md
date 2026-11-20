# A8 — Portfolio

Vanilla HTML/CSS/JS portfolio. Part of the Module 10: Vibe Coding of ITM 325.
<!--
## Preview

Double-click `index.html`, or serve the folder:

    python3 -m --bind 127.0.0.1

Then open <http://localhost:8000>.



## Deploy (Netlify)

1. Go to <https://app.netlify.com/drop> and drag the `Assignment8/` folder in.
   That's the fastest path and gives you a public URL immediately.
2. To auto-deploy from Git instead: connect the repo, set **Base directory**
   to `Assignment8` and leave the build command empty with publish directory `.`.
-->

## Structure

- `css/base.css` — tokens, reset, typography, buttons
- `css/main.css` — page shell
- `css/landing.css` — index.html only
- `js/main.js` — shared behaviour
- `js/background.js` — ambient canvas
- `prompts/` — the prompts used to build each step
- `_headers` — Netlify security and caching headers

## Directory layout

```mermaid
flowchart TD
    subgraph pages["Pages"]
        direction LR
        index["index.html"]
        projects["projects.html"]
        notfound["404.html (planned)"]
    end

    subgraph styles["css/"]
        direction LR
        base["base.css"]
        maincss["main.css"]
        landing["landing.css"]
        projectscss["projects.css"]
    end

    subgraph scripts["js/"]
        direction LR
        mainjs["main.js"]
        bgjs["background.js"]
        datajs["projects-data.js"]
        projjs["projects.js"]
    end

    subgraph media["assets/"]
        direction LR
        favicon["favicon.svg"]
        avatar["img/avatar.png"]
    end

    subgraph promptdir["prompts/"]
        direction LR
        roadmap["roadmap.md"]
        boiler["01-boilerplate.md"]
        landingp["02-landing-ui.md"]
        preview["local-preview.md"]
    end

    subgraph netlify["Netlify config"]
        direction LR
        headers["_headers"]
        redirects["_redirects (planned)"]
    end

    subgraph rootdocs["Repo docs — not published"]
        direction LR
        readme["README.md"]
        ideas["A8-My-Ideas.md"]
        instr["Assignment8-Instructions.md"]
    end
```

## What loads what

```mermaid
flowchart TD
    index["index.html"]
    projects["projects.html"]

    subgraph shared["Loaded by both pages"]
        direction LR
        base["base.css"]
        main["main.css"]
        mainjs["main.js"]
        bgjs["background.js"]
    end

    subgraph homeOnly["index.html only"]
        direction LR
        landing["landing.css"]
        avatar["img/avatar.png"]
    end

    subgraph projOnly["projects.html only"]
        direction LR
        projcss["projects.css"]
        datajs["projects-data.js"]
        projjs["projects.js"]
    end

    index --> shared
    index --> homeOnly
    projects --> shared
    projects --> projOnly

    projjs -.->|reads window.PROJECTS| datajs
    bgjs -.->|reads --pointer-x/y| mainjs
```

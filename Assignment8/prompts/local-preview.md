# Local Preview — Why Double-Click Fails

## Issue

Opening `index.html` by double-clicking shows an unstyled page, and the
console reports:

    Loading failed for the <script> with source
    "file:///run/user/1000/doc/221eP69s082ncdszYmz4Bw/js/main.js"

The same happens for `js/background.js` and `css/base.css`.

## Cause

`/run/user/1000/doc/<opaque-id>/` is the **XDG document portal**. When a
sandboxed application (Flatpak/Snap browser, or a file manager handing a file
to one) opens a document, the portal grants access to *that single file* and
re-exposes it under an opaque ID.

Only the file you opened exists at that path:

    /run/user/1000/doc/221eP69s082ncdszYmz4Bw/
    └── index.html          <- the only thing visible

Every sibling reference — `css/`, `js/`, `assets/` — resolves to a path that
does not exist, so it 404s. The markup and CSS are fine; the browser simply
cannot see them.

Confirm with:

    ls -la /run/user/1000/doc/221eP69s082ncdszYmz4Bw/

## Fix — serve over HTTP (recommended)

    cd "$HOME/Documents/02 My Git Projects/threetwentyfive/Assignment8"
    python3 -m http.server 8000 --bind 127.0.0.1

Open <http://localhost:8000>. Leave the terminal running; `Ctrl+C` stops it.
If port 8000 is busy, substitute any free port (8001, 8080, ...).

From the repo root instead:

    python3 -m http.server 8000 --bind 127.0.0.1 --directory Assignment8

## Fix — open the real path

Paste this into the address bar rather than double-clicking:

    file:///home/username_here/Documents/02%20My%20Git%20Projects/threetwentyfive/Assignment8/index.html

Note the `%20` for the spaces in `My Git Projects`. This works today because
the project uses plain `<script src>` and `<link>` with no ES modules and no
`fetch`.

## Fix — grant the browser filesystem access

If the browser is a Flatpak:

    flatpak list                      # find the app id
    flatpak override --user --filesystem="$HOME/Documents" <app-id>

Or use Flatseal: select the app, Filesystem -> Other files, add
`~/Documents`. Restart the browser afterwards.

## When a server becomes mandatory

The `file://` workaround stops working as soon as the project needs either of:

- `fetch()` — e.g. pulling project metadata from the GitHub API (step 05)
- ES modules (`<script type="module">`)

Both are blocked by CORS on `file://`. From that point on, always preview
through `python3 -m http.server`.

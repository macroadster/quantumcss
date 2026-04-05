1 — Flat grey background kills the library's identity
The current --q-light-bg: #f1f5f9 is a generic slate. Light mode needs a subtle warm-cool gradient tint to connect with the glass/cosmic aesthetic.

2 — .glass in light mode is opaque white, not glass
The current override sets 80% white + a flat border. The refractive edge, specular highlight, and iris-tinted backdrop that make it look like glass are all missing.

3 — Cards are plain white boxes with no depth or tint
Solid white + generic drop shadow. In light mode, glassmorphic cards should have frosted translucency, an inset highlight, and a tinted shadow.

4 — Inputs are plain white with no glass treatment
They fall back to a basic form field look. The blue glow focus ring also uses the neon --q-color-starlight-deep as the inner ring, which renders almost black — harsh in light mode.

5 - dashboard stat-value used to be a gradient, this is lost in both light and dark mode.

---
name: image-imports
description: Add or use images in this project through the centralized Vite URL exports in src/utils/icons.jsx.
---

# Image imports

Keep image paths out of JSX markup. This project resolves image assets through a single module so components depend on named assets instead of URL construction details.

## Adding an image

1. Place the file in `src/assets/images`.
2. Add a descriptive named export to `src/utils/icons.jsx` using this exact Vite-compatible pattern:

```js
export const descriptiveImage = new URL(
  "/src/assets/images/descriptive-image.webp",
  import.meta.url,
).href;
```

3. Import the named export into the component and pass it directly to `src`.

```jsx
import { descriptiveImage } from "../utils/icons";

<img src={descriptiveImage} alt="Descrição da imagem" />
```

Do not build asset paths in JSX, use `import.meta.env.BASE_URL` for application images, or create one-off image URL constants inside components.

function inlineMarkdown(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-accent underline hover:no-underline font-medium">$1</a>'
    );
}

/** Старый формат статей (таблицы, произвольные переносы) — как раньше на странице поста. */
export function legacyBlogContentToHtml(content: string): string {
  return content
    .replace(/\n/g, '<br>')
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/### (.*)/g, '<h3>$1</h3>');
}

/**
 * Контент статей: блоки через пустую строку; строки ## / ### — заголовки;
 * строки с «- » — элементы списка в одном блоке.
 */
export function blogContentToHtml(content: string): string {
  const raw = content.trim();
  if (raw.startsWith('<')) return raw;

  const blocks = raw.split(/\n\n+/);
  const parts: string[] = [];

  for (const block of blocks) {
    const b = block.trim();
    if (!b) continue;

    if (b.startsWith('## ')) {
      parts.push(`<h2 class="text-xl font-bold text-asphalt mt-6 mb-3">${inlineMarkdown(b.slice(3))}</h2>`);
      continue;
    }
    if (b.startsWith('### ')) {
      parts.push(`<h3 class="text-lg font-bold text-asphalt mt-4 mb-2">${inlineMarkdown(b.slice(4))}</h3>`);
      continue;
    }

    const lines = b.split('\n');
    if (lines.every((l) => !l.trim().startsWith('- '))) {
      parts.push(`<p class="text-text leading-relaxed mb-4">${inlineMarkdown(b.replace(/\n/g, ' '))}</p>`);
      continue;
    }

    const items = lines
      .filter((l) => l.trim().startsWith('- '))
      .map((l) => `<li class="mb-1">${inlineMarkdown(l.replace(/^\s*-\s*/, ''))}</li>`)
      .join('');
    parts.push(`<ul class="list-disc pl-5 mb-4 text-text space-y-1">${items}</ul>`);
  }

  return parts.join('');
}

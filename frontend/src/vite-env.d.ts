/// <reference types="vite/client" />

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.json' {
  const value: Record<string, unknown>
  export default value
}

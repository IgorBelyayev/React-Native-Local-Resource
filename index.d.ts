declare module "react-native-local-resource" {
  /**
   * Loads a resource (even in release builds on android) from the app bundle.
   *
   * @param source - resource ID (via import/require)
   *
   * @example loadLocaleResource(require("./myFile.md"))
   *
   * @example
   * ```
   * import MyFile from "./myFile.md"
   *
   * const MarkdownScreen = () => <Markdown>{MyFile}</Markdown>
   * ```
   */
  export default function loadLocalResource(source: any): Promise<string>
}

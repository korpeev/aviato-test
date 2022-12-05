export class Deserializer {
  static deserialize() {

  }

  private splitCamelCase(field: string) {
    if (field.includes('_')) {
      return field.split('_').map((char, index) => index % 2 === 0 ? char.charAt(0).toUpperCase() + char.slice(1) : char)
    }
  }
}
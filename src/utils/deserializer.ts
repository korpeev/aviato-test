export class Deserializer {
  static deserialize(field: string) {
    if (field.includes("_")) {
      return field
        .split("_")
        .map((char, index) =>
          index !== 0 ? char.charAt(0).toUpperCase() + char.slice(1) : char
        ).join("");
    }
  }
}

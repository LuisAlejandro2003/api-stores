export class CreateStoreDto {
    readonly name: string;
    readonly location: string;
    readonly description: string;
    readonly ownerId: string;  // Relacionamos con el ID del usuario
  }
  
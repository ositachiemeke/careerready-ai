export class BaseAuditResponseDto {
    id: string;
  
    createdAt: Date;
  
    updatedAt: Date;
  
    deletedAt?: Date | null;
  }
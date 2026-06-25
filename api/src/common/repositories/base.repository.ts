export abstract class BaseRepository {
    protected activeRecordFilter() {
      return {
        deletedAt: null,
      };
    }
  
    protected deletedRecordFilter() {
      return {
        deletedAt: {
          not: null,
        },
      };
    }
  
    protected softDeletePayload() {
      return {
        deletedAt: new Date(),
      };
    }
  
    protected restorePayload() {
      return {
        deletedAt: null,
      };
    }
  }
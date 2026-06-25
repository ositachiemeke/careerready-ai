export abstract class BaseRepository {
    protected isDeleted() {
      return {
        deletedAt: null,
      };
    }
  }
export abstract class BaseRepository {
  protected activeRecordFilter(): {
    deletedAt: null;
  } {
    return {
      deletedAt: null,
    };
  }

  protected deletedRecordFilter(): {
    deletedAt: {
      not: null;
    };
  } {
    return {
      deletedAt: {
        not: null,
      },
    };
  }

  protected softDeletePayload(): {
    deletedAt: Date;
  } {
    return {
      deletedAt: new Date(),
    };
  }

  protected restorePayload(): {
    deletedAt: null;
  } {
    return {
      deletedAt: null,
    };
  }
}
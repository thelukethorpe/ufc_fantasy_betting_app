package thorpe.luke.ufc.fantasy.util;

public class Page {

  private final int number;
  private final int size;

  private Page(int number, int size) {
    this.number = number;
    this.size = size;
  }

  public int startIndex() {
    return (number - 1) * size;
  }

  public int size() {
    return size;
  }

  public static Builder builder() {
    return new Builder();
  }

  public static class Builder {

    private int pageNumber;
    private int pageSize;

    private Builder() {}

    public Builder withPageNumber(int pageNumber) {
      this.pageNumber = pageNumber;
      return this;
    }

    public Builder withPageSize(int pageSize) {
      this.pageSize = pageSize;
      return this;
    }

    public Page build() {
      return new Page(pageNumber, pageSize);
    }
  }
}

package thorpe.luke.ufc.fantasy.util;

public class Mutable<TValue> {

  private TValue value;

  public Mutable(TValue value) {
    this.value = value;
  }

  public Mutable() {
    this(null);
  }

  public boolean hasValue() {
    return value != null;
  }

  public TValue getValue() {
    return value;
  }

  public void setValue(TValue value) {
    this.value = value;
  }
}

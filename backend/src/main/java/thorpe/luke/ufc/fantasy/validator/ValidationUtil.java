package thorpe.luke.ufc.fantasy.validator;

public class ValidationUtil {

  public static boolean fieldDoesNotExist(String field) {
    return field == null || field.isBlank();
  }
}

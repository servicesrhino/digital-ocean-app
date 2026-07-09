export default class RemoveCheckService {
  static remove(name, checked, data) {
    return data.map((row) =>
      row.id === name ? { ...row, printed: checked } : { ...row }
    );
  }
}

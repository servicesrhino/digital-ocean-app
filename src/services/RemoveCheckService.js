export default class RemoveCheckService {
  static remove(name, checked, data) {
    const printed = data.map((row) =>
      row.id === name ? { ...row, printed: false } : { ...row }
    );
    return printed;
  }
}

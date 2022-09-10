export default class Display {
  static noneComment = (emptyComment) => {
    emptyComment.style.display = 'none';
  };

  static blockComment = (emptyComment) => {
    emptyComment.style.display = 'block';
  };

  static noneUser = (emptyUser) => {
    emptyUser.style.display = 'none';
  };

  static blockUser = (emptyUser) => {
    emptyUser.style.display = 'block';
  };
}

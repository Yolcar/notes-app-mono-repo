export const Post = ({ id, title, body }) => {
  return (
    <li>
      <p>{id} - {title}</p>
      <small>{body}</small>
    </li>
  );
};

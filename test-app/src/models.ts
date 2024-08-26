
interface User {
  id: string;
  email: string;
  name: string;
}

interface Auth {
  id: string;
  userId: string;
  token: string;
}

export { User, Auth };

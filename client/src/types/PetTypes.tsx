export type Pet = {
  about?: string;
  age?: number;
  size?: string;
  neuteredOrSpayed?: string;
  gender?: string;
  name?: string;
  owner?: {
    refId?: string;
    refModel?: "User" | "Org";
  };
  type?: string;
  vaccination?: string;

};

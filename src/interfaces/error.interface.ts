export default interface Error {
  name?: string;
  stack?: string;
  status: number;
  message: string;
}

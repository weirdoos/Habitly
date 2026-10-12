export interface Data {
        name: string,
        content: string
      }
      
export interface User {
        email: string,
        password: string,
        name: string,
        content: Array<Data>
      }
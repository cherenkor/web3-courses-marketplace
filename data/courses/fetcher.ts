import courses from "./index.json"

export interface ICourse   {
    id: string;
    type: string;
    title: string;
    description: string;
    coverImage: string;
    author: string;
    link: string;
    slug: string;
    wsl: string[];
    createdAt?: string;
}

export interface ICourseWithIndex extends ICourse {
    index: number;
}

interface IReturn {
    data: ICourse[];
    courseMap: Record<string, ICourseWithIndex>
}
  
export const getAllCourses = (): IReturn => {

  return {
    data: courses,
    courseMap: courses.reduce((a, c, i) => {
        a[c.id] = {
            ...c,
            index: i
        }
        
      return a
    }, {} as Record<string, ICourseWithIndex>)
  }
}
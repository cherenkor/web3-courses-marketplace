import { ICourse, ICourseWithIndex } from "types/course";
import courses from "./index.json"

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
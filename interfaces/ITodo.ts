import {IUser} from "./IUser";
import {ECategories} from "../enums/Ecategories";
import {EStatuses} from "../enums/Estatus";

export interface ITodo {
   id?: string;
   title: string;
   assignee: IUser;
   assigned: IUser;
   category: ECategories;
   status: EStatuses;
   description: string;
   dateAdded: string;
   dateCompleted: string | null;
   updated?: boolean;
}


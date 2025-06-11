import { ref } from "vue"
import type { UserData,ArticleData } from './types';

// These have skelleton values becuase they should never be null,
// This makes it so I don't need to check for null every singe function that uses them
export const profileData = ref<UserData>({
  id: "",
  theme: "a",
  display: "light",
  spirit: "wounded waters bleeding",
  username: "",
  description: ""
})
export const articleData = ref<ArticleData>({
  id:"",
  user: "",
  img: null,
  title: "",
  description: "",
  tags: [],
  content: "",
  access: "private",
  published: "",
  updated: "",
})
export const notFoundPage = ref<string>("")
export const allUsers = ref<UserData[]>([])
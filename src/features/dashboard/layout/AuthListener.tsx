"use client"

import { createSupabase } from "@/lib/supabase/client"
import { clearUser, updateUser } from "@/store/user-slice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export function AuthListener() {

  const dispatch = useDispatch()
  const supabaseClient = createSupabase()

  useEffect(() => {

    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
      async (e, session) => {
        
        if(session?.user) {
          dispatch(updateUser(session.user))
        } else {
          dispatch(clearUser())
        }

      }
    )

    return () => {
      subscription.unsubscribe()
    }

  }, [dispatch, supabaseClient])

  return null

}
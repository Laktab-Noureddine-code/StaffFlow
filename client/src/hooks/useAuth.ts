import { useEffect, useState } from "react";
import api from "../api/axios";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get("/api/me")
      .then((res) => {
        setUser(res.data?.user ?? null);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { user, loading };
};

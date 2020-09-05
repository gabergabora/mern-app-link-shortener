import React, { useState, useCallback, useContext, useEffect } from "react";
import { useParams } from 'react-router-dom'
import useHttp from "../hooks/http.hook";
import Loader from "../components/Loader"
import LinkCard from "../components/LinkCard"
import AuthContext from '../context/AuthContext'

const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null);
  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLink(fetched);
    } catch (e) {}
  }, [token, linkId, request]);

  // eslint-disable-next-line
  {
    /* const deleteLink = useCallback(async () => {
    try {
      const deleted = await request(`/api/link/${linkId}`, 'DELETE', null, { Authorization: `Bearer ${token}`})
      setLink(null);
    } catch (e) {}
  }, [token, linkId, request]) */
  }

  useEffect(() => {
    getLink();
    // deleteLink()
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && link && <LinkCard link={link} />}</>;
}

export default DetailPage
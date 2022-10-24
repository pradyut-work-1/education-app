import React from "react";
import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function handler(req, res) {
  const { on } = req.query;

  // const subjectArray = subject.split(',');

  const fetch = async () => {
    try {
      let { data, error, status } = await supabase
        .from("Attendance")
        .select(`in, out`)
        .match({ for: 123, on: on })
        .single();

      if (error && status !== 406) {
        throw error;
      }
if(data === null){
    
    res.status(200).json({ data: {in: null, out: null} })
}
else {
    res.status(200).json({ data : data })
}


    } catch (error) {
      res.status(500).send({ error: error });
    } finally {
    }
  };

  fetch();
}

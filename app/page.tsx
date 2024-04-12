"use client"

// import SleepScreen from "@/components/shared/SleepScreen";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";
import axios from "axios";

interface Country {
  id: number;
  countryCode: string;
  countryName: string;
}

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([])

  const getAllCountries = async () =>   {
    const token = process.env.NEXT_PUBLIC_API_TOKEN;

    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Country/GetAll?pageNumber=1&pageSize=2000`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
      })
      const data = response.data;
      setCountries(data);
    } catch (error) {
      return []
    }
  }

  useEffect(() => {
    getAllCountries()
  }, [])
  

  return (
    <main>
      {/* <SleepScreen /> */}
      <p>Main pages</p>
      <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>            
            <SelectLabel>Fruits</SelectLabel>
            {countries?.length > 0 && countries?.map((country) => (
              <SelectItem key={country?.id} value={country?.countryCode}>
                {country?.countryName}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    
    

    </main>
  );
}

import React,{useState , useEffect}  from 'react';
import Head from "next/head";
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {useSession, getSession} from "next-auth/react";
import FooterSocial from '../../components/FooterSocial'
import Link from "next/link"
import { toast } from "react-hot-toast";
import { Controller,useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { collection, onSnapshot, orderBy, query ,where, addDoc, serverTimestamp } from "@firebase/firestore";
import  { db } from "../../lib/firebase"
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { ArrowLeftIcon } from  '@heroicons/react/solid';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';


function Create( ){ 
    const {data: session,status} = useSession();
    const [loading, setLoading] =useState();
    const { register, watch, control, formState: { errors, isValid  } } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    });
    // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      name: event.target.name.value,
      address: event.target.address,
      phoneNumber: event.target.phoneNumber,
      owner: event.target.owner,
      email: event.target.email,
    }

    // Send the data to the server in JSON format.
    // const JSONdata = JSON.stringify(data)

    // Form the request for sending data to the server.
    try {
        const res = await axios.post(
           `https://wjdf0xeju5.execute-api.ap-northeast-1.amazonaws.com/prod`,
          {
            data
          },{
            headers:{
                'Access-Control-Allow-Origin':'*'
            }
          }
        );
        console.log(res)
        .then(json => {
            console.log(json) // Handle success
        })
        .catch(err => {
            console.log(err) // Handle errors
        }); //check now
      } catch (e) {console.log(e)}
    // Send the form data to our forms API on Vercel and get a response.
   
}

    if (status === "loading") {
        return <p>Loading...</p>
      }
      
      console.log(watch(['name','address','phoneNumber','owner','email']))

          return (
            <div >
                <Head>
                    <title>Olive | Create </title>
                    <link rel="icon" href="favicon.ico" />
                </Head>
                <Header/>
                  <main className="main bg-teal-50 md:h-full overflow-hidden">
                            <div className="flex-grow pt-10  md:pt-30 mt-5   px-4 py-16 mx-auto sm:px-6 lg:px-8 bg-white rounded-md ">
                            <section className="pt-6">
          <nav className="flex text-sm font-medium border-b border-gray-100 lg:max-w-xl">
                {/* <Link href='/'>
                  <ArrowLeftIcon className="rounded-full w-8 h-8 mb-8 cursor-pointer" />
                </Link> */}
                                <div className="max-w-lg mx-auto text-center pb-8 ">
                                    <h1 className="font-bold  text-3xl text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
                                        Create Daycare Center
                                    </h1>
                                </div>
            </nav>
          </section>
                                <form className="max-w-md mx-auto mt-8 mb-0 space-y-4"  onSubmit={handleSubmit}>
                                    <div className="relative">
                                    <Grid item xs={6} md={8} className="pb-8">
                                    <InputLabel shrink  style={{ fontSize: '24px'}}>ชื่อศูนย์ดูแล</InputLabel>
                                                    <FormControl sx={{ width: '100%',}} variant="standard">
                                                    <Controller
                                                        render={({ field: { onChange, value } }) => (
                                                            <>                  
                                                                <TextField
                                                                        id="outlined-textarea"
                                                                        placeholder="ศูนย์ดูแลแห่งหนึ่ง.."
                                                                        value={value || undefined}
                                                                        onChange={onChange} 
                                                                        multiline
                                                                />
                                                            </>
                                                                )}
                                                                id="name"
                                                                name="name"
                                                                control={control}
                                                                rules={{
                                                                    required: false
                                                                }
                                                                }
                                                                />
                                                    </FormControl>
                                            </Grid>
                                                                
                                            <Grid item xs={6} md={8} className="pb-8">
                                            <InputLabel shrink  style={{ fontSize: '24px'}}>ที่อยู่</InputLabel>
                                                    <FormControl sx={{ width: '100%',}} variant="standard">
                                                    <Controller
                                                        render={({ field: { onChange, value } }) => (
                                                            <>                  
                                                                <TextField
                                                                        id="outlined-textarea"
                                                                        placeholder="12 คลองเตย กทม 12546"
                                                                        value={value || undefined}
                                                                        onChange={onChange} 
                                                                        multiline
                                                                />
                                                            </>
                                                                )}
                                                                id="address"
                                                                name="address"
                                                                control={control}
                                                                rules={{
                                                                    required: false
                                                                }
                                                                }
                                                                />
                                                    </FormControl>
                                            </Grid>
                                            <Grid item xs={6} md={12}  className="pb-8">
                                                <InputLabel shrink  style={{ fontSize: '24px'}}>ชื่อเจ้าของศูนย์ดูแล</InputLabel>
                                                    <FormControl sx={{ width: '100%',}} variant="standard">
                                                    <Controller
                                                        render={({ field: { onChange, value } }) => (
                                                            <>                  
                                                                <TextField
                                                                        id="outlined-textarea"
                                                                        placeholder="ชื่อเจ้าของหรือผู้ดูแลศูนย์ดูแล"
                                                                        value={value || undefined}
                                                                        onChange={onChange} 
                                                                        multiline
                                                                />
                                                            </>
                                                                )}
                                                                id="owner"
                                                                name="owner"
                                                                control={control}
                                                                rules={{
                                                                    required: false
                                                                }
                                                                }
                                                                />
                                                    </FormControl>
                                            </Grid>
                                            <Grid item xs={6} md={12}  className="pb-8">
                                                <InputLabel shrink  style={{ fontSize: '24px'}}>เบอร์โทรศัพท์</InputLabel>
                                                    <FormControl sx={{ width: '100%',}} variant="standard">
                                                    <Controller
                                                        render={({ field: { onChange, value } }) => (
                                                            <>                  
                                                                <TextField
                                                                        id="outlined-textarea"
                                                                        placeholder="046843445"
                                                                        value={value || undefined}
                                                                        onChange={onChange} 
                                                                        multiline
                                                                />
                                                            </>
                                                                )}
                                                                id="phoneNumber"
                                                                name="phoneNumber"
                                                                control={control}
                                                                rules={{
                                                                    required: false
                                                                }
                                                                }
                                                                />
                                                    </FormControl>
                                            </Grid>
                                            <Grid item xs={6} md={12}  className="pb-8">
                                                <InputLabel shrink  style={{ fontSize: '24px'}}>อีเมล์</InputLabel>
                                                    <FormControl sx={{ width: '100%',}} variant="standard">
                                                    <Controller
                                                        render={({ field: { onChange, value } }) => (
                                                            <>                  
                                                                <TextField
                                                                        id="outlined-textarea"
                                                                        placeholder="abd@efg.com"
                                                                        value={value || undefined}
                                                                        onChange={onChange} 
                                                                        multiline
                                                                />
                                                            </>
                                                                )}
                                                                id="email"
                                                                name="email"
                                                                control={control}
                                                                rules={{
                                                                    required: false
                                                                }
                                                                }
                                                                />
                                                    </FormControl>
                                            </Grid>
                                    </div>
                                    <div className="relative text-center">
                                        <button type="submit" className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg" disabled={!isValid}>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                  </main>
            </div>
        )
}

export default Create;




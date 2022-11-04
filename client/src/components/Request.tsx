import React, {useState, useEffect, SetStateAction} from 'react';

const Request = () => {
    const [formData, setFormData]: any = useState({})
    const [types, setTypes]: any = useState(["PTO", "Sick", "Other"])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Entered Submit Handler')
        console.log(JSON.stringify(formData))
        fetch('/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
          .then( async res => {
            console.log(res)
            if (res.ok) {
              const response = await res.json()
            }
          })
          .then(data =>{
            console.log(data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target)
        let {name, value} = e.target
        setFormData({...formData, [name]: value})
      }

    return (
        <div className="request-form">
            <form onSubmit={(e)=>handleSubmit(e)}>
                <label>
                    Name:
                    <input type="text" name="name" onChange={(e)=>handleChange(e)} />
                </label>
                <select name="type" onChange={(e)=>handleChange(e)}>
                    {types.map((val: string, i: number) => (<option key={i} value={val}> {val} </option>)) }
                </select>
                <label>
                    Start Date:
                    <input type="date" name="start date" onChange={(e)=>handleChange(e)} />
                </label>
                <label>
                    End Date:
                    <input type="date" name="end date" onChange={(e)=>handleChange(e)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )

}

export default Request
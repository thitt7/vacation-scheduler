import React, {useState, useEffect} from 'react';

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
            console.log(res.status)
            if (!res.ok) {
            alert("Error " + res.status + ": please try again")
            }
            return res.json()
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
                    Username:
                    <input required type="email" name="username" onChange={(e)=>handleChange(e)} />
                </label>
                <label>
                    Name:
                    <input required type="text" name="name" onChange={(e)=>handleChange(e)} />
                </label>
                <select name="type" onChange={(e)=>handleChange(e)}>
                    {types.map((val: string, i: number) => (<option key={i} value={val}> {val} </option>)) }
                </select>
                <label>
                    Start Date:
                    <input required type="date" name="start date" onChange={(e)=>handleChange(e)} />
                </label>
                <label>
                    End Date:
                    <input required type="date" name="end date" onChange={(e)=>handleChange(e)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )

}

export default Request
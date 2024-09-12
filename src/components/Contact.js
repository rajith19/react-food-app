const Contact = () => {
    return (
        <div>
            <h1 className="font-bold text-2xl p-4 m-4">Contact Us</h1>
            <form>
                <input type="text" className="border border-black p-2 m-2" placeholder="name" />
                <input type="text" className="border border-black p-2 m-2" placeholder="message" />
                <button className="border border-black p-2 m-2 bg-blue-500 rounded-lg text-white">Submit</button>
            </form>

        </div>
    )
}

export default Contact;
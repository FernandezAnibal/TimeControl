const notesCtrl = {};

const Note = require('../models/Note');

notesCtrl.getNotes = async (req, res) => { 
    const notes = await Note.find();
    res.json(notes);
}


notesCtrl.createNote = async (req, res) => {
    const {title, content, author, date} =req.body;
    const newNote = new Note({
        title,
        content,
        date,
        author
    });
    await newNote.save()
    res.json({message: 'Note Saved'})
}

notesCtrl.getNote = async (req, res) => 
{
    const note = await Note.findById(req.params.id); 
    console.log(note);
    res.json(note)
}

notesCtrl.updateNote = async (req, res) => 
{
    const {title,content, date, author} = req.body;
    await Note.findOneAndUpdate(req.params.id, {
        title,
        content,
        date,
        author
    });
    res.json({title: 'Update Note'})
}

notesCtrl.deleteNote = async (req, res) => 
{
    const note = await Note.findOneAndDelete(req.params.id); 
    console.log(note);
    res.json({title: 'Deleted Note'})
}
module.exports = notesCtrl;
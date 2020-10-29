import React from "react";
import MDEditor from '@uiw/react-md-editor';
import Axios from 'axios';
import { ListItem, List, Grid, Button, TextField, Paper } from '@material-ui/core';


const root = {
    flexGrow: 1,
};
const paper = {
    padding: "20px",
    textAlign: 'center'
};
const def = {
    padding: "40px"
  };

export class ReactApp extends React.Component {
    state = {
        content: "",
        name: "",
        documents: []
    }
    constructor(props) {
        super(props);
        this.setContent = this.setContent.bind(this);
        this.setName = this.setName.bind(this);
        this.setDocument = this.setDocument.bind(this);
        this.setDocuments = this.setDocuments.bind(this);
        this.newDocument = this.newDocument.bind(this);
        this.setState(
            {
                content: "",
                name: "",
                documents: []
            }
        );

    }

    setContent(content) {
        this.setState({ content: content });
    }

    setName(name) {
        this.setState({ name: name.target.value });
    }

    setDocuments(documents) {
        this.setState({ documents: documents });
    }

    newDocument() {
        this.setState({ content: "", name: "" });
        console.log(this.state.content);
    }

    setDocument(name, content) {
        this.setState({ content: content, name: name });
    }


    loadDocuments() {
        Axios.get("http://localhost:3000/api/markdownFiles").then(
            response => {
                this.setDocuments(response.data)
            }
        );
    }

    componentWillMount() {
        Axios.get("http://localhost:3000/api/markdownFiles").then(
            response => {
                this.setState(
                    {
                        documents: response.data
                    }
                )
            }
        );
    }


    render() {
        const deleteDocument = () => {
            Axios.delete("http://localhost:3000/api/markdownFile/" + this.state.name);
            var docs = this.state.documents.filter(d => d.name !== this.state.name);
            this.setDocuments(docs);
            this.newDocument();
        }
        const listDocuments = this.state.documents.map(element => {
            return (
                <ListItem key={element.name} button onClick={() =>
                    this.setDocument(element.name, element.content)
                }>
                    {element.name}
                </ListItem>
            );
        });

        const saveDocument = () => {
            var newDocument = {
                "name": this.state.name,
                "content": this.state.content

            };
            Axios.post("http://localhost:3000/api/markdownFile", newDocument);
            var docs = this.state.documents.filter(d => d.name !== this.state.name);
            docs.push(newDocument);
            this.setDocuments(docs);
        }
        return (
            <Grid container spacing={4} direction="row" justify="center" alignItems="center" style={def}>
                <Grid item xs={3}>
                    <Paper className="paper">
                        <List>
                            {listDocuments}
                        </List>
                    </Paper>
                </Grid>
                <Grid container direction="column" spacing={2} justify="space-evenly" alignItems="stretch" xs={9}>
                    <Grid item xs={12}>
                        <TextField label="Name" variant="outlined" value={this.state.name} onChange={this.setName} />
                    </Grid>

                    <Grid item xs={12}>
                        <div className="container">
                            <MDEditor
                                value={this.state.content}
                                onChange={this.setContent}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={12}>

                        <Grid container xs={9} spacing={3} alignItems="stretch" justify="center">
                            <Grid item>


                                <Button variant="contained" onClick={this.newDocument}>New Document</Button>
                            </Grid>
                            <Grid item>

                                <Button variant="contained" color="primary" onClick={saveDocument}>Save</Button>
                            </Grid>
                            <Grid item xs={3}>

                                <Button variant="contained" color="secondary" onClick={deleteDocument}>Delete</Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        );
    }
}
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ModalGenerateNodes from './components/ModalGenerateNodes';
import ModalSat from './components/ModalSat';
import '../node_modules/vis/dist/vis.css';
import './App.css';

// import dogGif from './img/hello-dog.gif';
// import axios from 'axios';


// options for vis.js
let vis = require('vis');
var network;
var options;
var id = 0;

class App extends Component {
    constructor() {
        super();

        this.state = {
            modalNodes : false,
            modalSat : false
            // finalJSON : {},
            // colors: null,
        }

        this.addNode = this.addNode.bind(this);
        this.showModalNodes = this.showModalNodes.bind(this);
        this.handleGenerateNodes = this.handleGenerateNodes.bind(this);
        this.showModalSat = this.showModalSat.bind(this);
        this.handleSat = this.handleSat.bind(this);
        this.generateColors = this.generateColors.bind(this);
        this.hslToHex = this.hslToHex.bind(this);

        // this.generateNodesColors = this.generateNodesColors.bind(this);
        // this.generateJSON = this.generateJSON.bind(this);
        
        // this.generateLinks = this.generateLinks.bind(this);
        // this.checkLinks = this.checkLinks.bind(this);
        // this.generateNodes = this.generateNodes.bind(this);
        // this.handleChangeColor = this.handleChangeColor.bind(this);
        // this.handleChangeNodes = this.handleChangeNodes.bind(this);
        // this.generateRandomNodes = this.generateRandomNodes.bind(this);

        // this.getRandomInt = this.getRandomInt.bind(this);
        // this.getRandomPosition = this.getRandomPosition.bind(this);
        // this.generatePositionsArray = this.generatePositionsArray.bind(this);
    }

    componentDidMount() {
        // Initialize the graph (the graph will be empty at the beginning)
        let nodes = new vis.DataSet([]);
        let edges = new vis.DataSet([]);

        options = {
            manipulation: {
                enabled: true,
                initiallyActive: true,
                deleteNode: true,
                deleteEdge: true,
                addNode: this.addNode
            },
            edges: {
                smooth: {
                    forceDirection: "none",
                    roundness: 0.15
                }
            },
            physics: {
                minVelocity: 0.75
            },
            nodes: {
                borderWidth: 1,
                borderWidthSelected: 2,
                color: {
                    border: '#000',
                    background: '#fff',
                    highlight: {
                        border: '#000',
                        background: '#e3e3e3'
                    }
                },
                font : {
                    color: '#000',
                    align: 'center',
                },
                shape: 'ellipse'
            },
        };

        let data = {
            nodes: nodes,
            edges: edges
        }

        var graphContainer = document.getElementById('graph');
        network = new vis.Network(graphContainer, data, options);
    }

    // TODO: modify label
    addNode(node, callback) {
        node.label = id.toString();
        node.id = id;
        id += 1;

        callback(node);
    }

    showModalNodes() {
        this.setState({
            modalNodes : !this.state.modalNodes
        })
    }

    handleGenerateNodes(numberOfNodes) {
        var nodes = [];
        var edges = [];
        var connectionCount = [];

        // var positions = this.generatePositionsArray();

        // Randomly create some nodes and edges
        for (let i = 0; i < numberOfNodes; i++) {
            nodes.push({
                id: i,
                label: String(i),
                // x : this.getRandomPosition(positions, true).x,
                // y : this.getRandomPosition(positions, true).y
            })

            connectionCount[i] = 0;

            // create edges in a scale-free-network way
            if (i == 1) {
                var from = i;
                var to = 0;
                edges.push({
                    from: from,
                    to: to
                })

                connectionCount[from]++;
                connectionCount[to]++;
            } else if (i > 1) {
                var conn = edges.length * 2;
                var rand = Math.floor(Math.random() * conn);
                var cum = 0;
                var j = 0;

                while (j < connectionCount.length && cum < rand) {
                    cum += connectionCount[j];
                    j++;
                }

                var from = i;
                var to = j;
                edges.push({
                    from: from,
                    to: to
                })

                connectionCount[from]++;
                connectionCount[to]++;
            }
        }

        let data = {
            nodes: nodes,
            edges: edges
        }

        this.setState({
            modalNodes: false
        })
        
        id = numberOfNodes;

        var graphContainer = document.getElementById('graph');
        network = new vis.Network(graphContainer, data, options);
    }

    showModalSat() {
        this.setState({
            modalSat: !this.state.modalSat
        })
    }

    handleSat(numberOfColors) {
        let jsonFile = {
            colors : this.generateColors(numberOfColors),
            // links : this.generateLinks(nodes),
            // nodes : this.generateNodes(nodes)
        }
        console.log(jsonFile);
    }

    // StackOverflow is love, StackOverflow is life
    generateColors(number) {
        let colors = [];
        for (let i = 0; i < 360; i += 360 / number) {
            let hue = i;
            let saturation = 90 + Math.random() * 10;
            let lightness = 50 + Math.random() * 10;
            colors.push(this.hslToHex(hue, saturation, lightness));
        }
        return colors;
    }

    hslToHex(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;
        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        const toHex = x => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    // generateNodesColors(nodes){
    //     let array = [];

    //     for (let node of nodes) {
    //         array.push(Number(node.node), String(node.color))
    //     }

    //     return array;
    // }

    // generateJSON(nodes) {
        // let jsonFile = {
        //     colors : this.generateColors(),
        //     links : this.generateLinks(nodes),
        //     nodes : this.generateNodes(nodes)
        // }

    //     // post
    //     axios.post('/problem', jsonFile)
    //         .then(res => {
    //             console.log(res.data);
    //             if(res.data.status == "satisfiable"){
    //                 // render result
    //                 // add color to the node

    //                 // error: 'generateNodesColors' is not defined
    //                 // var nodes_colors = generateNodesColors(res.data.solutions)
    //                 // this.setState({
    //                 //     nodes: nodes_colors // posso usare nodes per passarlo a GraphContainer?
    //                 // })
    //             }
    //         })

    //     // console.log('send to python')
    //     // console.log(jsonFile)
    // }


    // generateLinks(nodes) {
    //     let links = []
    //     for (let node of nodes) {
    //         for (let connection of node.connections) {
    //             let link = [Number(node.id), connection]
    //             link.sort()

    //             if (!this.checkLinks(links, link)) {
    //                 links.push(link)
    //             }
    //         }
    //     }
    //     return links;
    // }

    // checkLinks(links, link) {
    //     let i, current;
    //     let check = false;
    //     for (i = 0; i < links.length; i++) {
    //         current = links[i];

    //         if ((current[0] == link[0]) && (current[1] == link[1])) {
    //             return true
    //         }
    //     }
    //     return false
    // }


    // generateNodes(nodes) {
    //     let array = [];

    //     for (let node of nodes) {
    //         array.push(Number(node.id))
    //     }

    //     return array;
    // }

    // handleChangeColor(e) {
    //     this.setState({
    //         colors: e.target.value
    //     })
    // }

    // handleChangeNodes(nodes) {
    //     this.setState({
    //         nodes: nodes
    //     })

    //     this.generateRandomNodes(nodes)
    // }

    // // Returns a random integer between min (included) and max (excluded)
    // getRandomInt(min, max) {
    //     return Math.floor(Math.random() * (max - min)) + min;
    // }


    // // generate random positions
    // generatePositionsArray() {
    //     var maxX = 1600;
    //     var maxY = 800;
    //     var safeRadius = 2;
    //     var irregularity = 300;

    //     // declarations
    //     var positionsArray = [];
    //     var r, c;
    //     var rows;
    //     var columns;

    //     // count the amount of rows and columns
    //     rows = Math.floor(maxY / safeRadius);
    //     columns = Math.floor(maxX / safeRadius);

    //     // loop through rows
    //     for (r = 1; r <= rows; r += 1) {
    //         // loop through columns
    //         for (c = 1; c <= columns; c += 1) {
    //             // populate array with point object
    //             positionsArray.push({
    //                 x: Math.round(maxX * c / columns) + this.getRandomInt(irregularity * -1, irregularity),
    //                 y: Math.round(maxY * r / rows) + this.getRandomInt(irregularity * -1, irregularity)
    //             });
    //         }
    //     }
    //     // return array
    //     return positionsArray;
    // }

    // get random position from positions array
    // getRandomPosition(array, removeTaken) {

    //     // declarations
    //     var randomIndex;
    //     var coordinates;

    //     // get random index
    //     randomIndex = this.getRandomInt(0, array.length - 1);

    //     // get random item from array
    //     coordinates = array[randomIndex];

    //     // check if remove taken
    //     if (removeTaken) {
    //         // remove element from array
    //         array.splice(randomIndex, 1);
    //     }

    //     // return position
    //     return coordinates;
    // }

    render() {
        return (
            <div className="App">
                <div className="App-container">
                    <div className="GraphContainer--container">
                        <div id="graph">
                        </div>
                    </div>

                    <div className="Buttons-container">
                        <Button bsStyle="primary" onClick={() => this.showModalNodes()}>Create random graph</Button>
                        <Button bsStyle="primary" onClick={() => this.showModalSat()}>Sat solver</Button>
                    </div>
                </div>

                {this.state.modalNodes && (
                    <ModalGenerateNodes 
                        showModal={this.state.modalNodes}
                        close={this.showModalNodes}
                        handleGenerateNodes={this.handleGenerateNodes}
                    />
                )}

                {this.state.modalSat && (
                    <ModalSat 
                        showModal={this.state.modalSat}
                        close={this.showModalSat}
                        handleSat={this.handleSat}
                    />
                )}
                {/* <Settings
                    colors={this.state.colors}
                    handleChangeColor={this.handleChangeColor}
                    handleChangeNodes={this.handleChangeNodes}
                    nodes={this.state.nodes}
                /> */}
                {/* <div> */}
                    {/* <div id="gif-dog">
                        <img src={dogGif}/>
                    </div> */}
                
                    {/* </div> */}
                {/* </div> */}
            </div>
        );
    }
}

export default App;

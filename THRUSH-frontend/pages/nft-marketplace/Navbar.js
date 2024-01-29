import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Container } from 'react-bootstrap'

const Navigation = ({ web3Handler, account }) => {
    return (
        <Navbar expand="lg" bg="white">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link  style={{color: "orange"}} as={Link} to="/">Home</Nav.Link>
                        <Nav.Link  style={{color: "orange"}} as={Link} to="/nft-marketplace/create">Create</Nav.Link>
                        <Nav.Link  style={{color: "orange"}} as={Link} to="/nft-marketplace/my-listed-items">My Listed Items</Nav.Link>
                        <Nav.Link  style={{color: "orange"}} as={Link} to="/nft-marketplace/my-purchases">My Purchases</Nav.Link>
                        <Nav.Link  style={{color: "orange"}} as={Link} to="/nft-marketplace/reviews">Reviews</Nav.Link>
                    </Nav>
                    <Nav>
                        {account ? (
                            <Nav.Link
                                href={`https://etherscan.io/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4">
                                <Button variant="outline-secondary">
                                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                </Button>

                            </Nav.Link>
                        ) : (
                            <Button onClick={web3Handler} variant="outline-secondary">Connect Wallet</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Navigation;
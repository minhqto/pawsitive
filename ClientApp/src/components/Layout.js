import React, { Component } from "react";
import { Container } from "reactstrap";
import Box from '@material-ui/core/Box';
import { NavMenu } from "./NavMenu";
import { Footer } from "./Footer";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Container maxWidth={false}>
          <Box mb={10} mt={4}>{this.props.children}</Box>
        </Container>
        <Footer />
      </div>
    );
  }
}

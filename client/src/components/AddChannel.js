import React, { useState } from 'react';
import { Button, Header, Icon, Modal, Input, Dropdown, Form } from 'semantic-ui-react';
import styled, { css } from 'styled-components';

// const AddChannel = styled.span`
//   cursor: pointer;
// `;

const countryOptions = [{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }];

function AddChannel() {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      trigger={
        <span style={{ cursor: 'pointer' }}>
          <Icon name="link add" />
          Add a channel
        </span>
      }
      closeIcon
    >
      <Header content="Create a channel" />
      <Modal.Content>
        <Form open={open} size="large" method="post" id="addChannel" action="#">
          <Form.Field>
            <label>Name</label>
            <input placeholder="Name" />
          </Form.Field>
          <Form.Field>
            <label>Purpose</label>
            <input />
          </Form.Field>
          <Form.Field>
            <label>Send invites to</label>
            <Dropdown clearable fluid multiple search selection options={countryOptions} placeholder="Search by name" />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" form="addChannel">
          Create Channel
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default AddChannel;

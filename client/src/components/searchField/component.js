import React from 'react';
import { Box, TextInput } from 'grommet';
import { IconButton } from 'grommet-controls';
import { Search } from 'grommet-icons';
import { withCSRF } from '../../util';

const VisualComponent = () => {
  const [value, setValue] = React.useState('');
  return (
    <Box
      gridArea="header"
      direction="row"
      align="center"
      justify="center"
      height="small"
    >
      <TextInput
        placeholder="Search for a project"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <IconButton
        margin={{ left: 'small' }}
        icon={<Search />}
        onClick={() => alert('Clicked')}
      />
    </Box>
  );
};

const SearchField = withCSRF(VisualComponent);

export default SearchField;

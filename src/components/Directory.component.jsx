import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MenuItem from './MenuItem.component';
import { selectDirectorySections } from '../redux/directory/directory.selector';

const  Directory = ({ sections  }) => {

        return (
            <div className='directory-menu'>
                {
                    sections.map(({ id, ...otherSectionProps}) => 
                            <MenuItem {...otherSectionProps} key={id}/>
                    )
                }
            </div>
        )

}


const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);
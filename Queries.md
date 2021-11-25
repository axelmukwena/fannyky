
    UPDATE painters
    SET about = 'In 2004, WONG Shuk Fan (Fanny) graduated with a BA (Hons) degree in Fine Art at Kingston University, in the UK. In the following year, she earned her Master’s Degree in Arts (Visual Cultural, Identity and Arts Expression in Education) from Goldsmiths College, University of London.\n Fanny is now teaching at the University of Macau and a PhD candidate at Hong Kong Baptist University. Fanny is interested in visualising the music language in 2-D abstract art form. In her “music” pieces, colour represents the atmosphere of sound, while lines signify rhythms and movements. Her artwork also interprets her memories and observations towards life, people and nature. Her work has been displayed in England, Korea, Macau and Hong Kong.'
    WHERE id = 1

    DELETE FROM paintings WHERE id=1;

    DELETE FROM active_storage_attachments WHERE id=1;

    DELETE FROM active_storage_blobs WHERE id=1;
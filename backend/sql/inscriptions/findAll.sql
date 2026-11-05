SELECT 
    I.*,
    A.name AS activity,
    P.name AS participant
FROM 
    inscriptions I
LEFT JOIN 
    activities A ON A.id = I.id_activity
LEFT JOIN 
    participants P ON P.id = I.id_participant
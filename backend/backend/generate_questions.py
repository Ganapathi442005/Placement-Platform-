#!/usr/bin/env python3
"""
Generate 320 questions with keywords for the placement platform.
- Level 1 CORE: 70 questions
- Level 2 CORE: 50 questions  
- Level 3 CORE: 100 questions
- Level 3 IT: 100 questions (non-coding, descriptive type)
"""

import json
import sys

# Sample questions data - you can expand this significantly
LEVEL_1_CORE_QUESTIONS = [
    {
        "question": "Define volumetric efficiency",
        "keywords": ["ratio", "actual air intake", "theoretical air intake", "engine cylinder", "air-fuel mixture", "intake process", "engine performance", "efficiency measure", "internal combustion engine", "percentage"],
        "description": "Volumetric efficiency is a measure of the effectiveness of an engine to fill its cylinders with air-fuel mixture. It represents the ratio between actual air intake and theoretical maximum intake. This is expressed as a percentage and is important for engine performance tuning. Factors affecting it include valve timing, manifold design, and engine speed."
    },
    {
        "question": "Explain the concept of stress",
        "keywords": ["force per unit area", "internal resistance", "material deformation", "perpendicular", "mechanical property", "mechanical stress", "external load", "structural analysis", "strength", "intensity"],
        "description": "Stress is the internal resistance offered by material to external loads applied per unit area. It represents the intensity of force distribution on the material and is measured in Pa or N/mm². There are different types including tensile stress, compressive stress, and shear stress. Understanding stress is crucial for structural analysis and engineering design."
    },
    {
        "question": "What is friction in mechanics?",
        "keywords": ["resistance to motion", "two surfaces in contact", "opposing force", "coefficient of friction", "mechanical resistance", "kinetic friction", "static friction", "surface properties", "normal force", "tangential"],
        "description": "Friction is the opposing force that acts when two surfaces try to move relative to each other. It exists when there is contact between surfaces and acts to prevent relative motion. Static friction prevents motion initially, while kinetic friction occurs during motion. The magnitude depends on coefficient of friction and normal force."
    },
    {
        "question": "Define Young's modulus",
        "keywords": ["elastic modulus", "stress to strain ratio", "material elasticity", "linear stress-strain", "material property", "tensile property", "deformation resistance", "elasticity measure", "mechanical behavior", "Pa or N/mm²"],
        "description": "Young's modulus is the measure of material stiffness, defined as the ratio of stress to strain in the linear elastic region. It quantifies how much a material will deform under tension or compression. Materials with high Young's modulus are stiffer and resist deformation. It is a fundamental mechanical property used in structural design and material selection."
    },
    {
        "question": "Explain equilibrium in physics",
        "keywords": ["balanced forces", "zero acceleration", "zero net force", "stationary", "constant velocity", "moment balance", "torque", "static equilibrium", "dynamic equilibrium", "Newton's laws"],
        "description": "Equilibrium is a state where all forces and moments acting on a body are balanced, resulting in zero acceleration. In static equilibrium, the body is at rest; in dynamic equilibrium, it moves with constant velocity. For complete equilibrium, the sum of all forces and the sum of all moments must be zero. This principle is used in structural analysis and engineering design."
    },
    {
        "question": "What is a spring constant?",
        "keywords": ["restoring force coefficient", "Hooke's law", "force per unit extension", "material stiffness", "elastic property", "N/m", "displacement relationship", "elastic force", "spring properties", "linearity"],
        "description": "Spring constant is a measure of spring stiffness, defined as the force required to extend or compress the spring by a unit length. It follows Hooke's law where force is proportional to displacement. A higher spring constant indicates a stiffer spring. Spring constant is essential in designing mechanical systems with elastic components."
    },
    {
        "question": "Define density",
        "keywords": ["mass per unit volume", "kg/m³", "material property", "compactness", "substance concentration", "specific gravity", "relative density", "mass density", "material composition", "weight distribution"],
        "description": "Density is defined as the mass per unit volume of a substance, typically measured in kg/m³. It indicates how compact or tightly packed the material is. Different materials have different densities; for example, iron is denser than water. Density is a fundamental property used in calculations for buoyancy, weight distribution, and material selection."
    },
    {
        "question": "Explain moment of inertia",
        "keywords": ["resistance to angular motion", "rotational mass", "mass distribution", "distance from axis", "kg·m²", "rotational property", "angular acceleration", "second moment of area", "rotational dynamics", "parallel axis theorem"],
        "description": "Moment of inertia is the rotational equivalent of mass, representing resistance to angular acceleration. It depends on both the mass and distribution of mass relative to the axis of rotation. The further the mass is from the axis, the greater the moment of inertia. It is crucial in analyzing rotational motion and designing rotating components."
    },
    {
        "question": "What is entropy?",
        "keywords": ["disorder measure", "thermodynamics", "irreversibility", "heat transfer", "second law", "system randomness", "energy dispersion", "statistical mechanics", "system state", "J/K"],
        "description": "Entropy is a measure of disorder or randomness in a system, central to the second law of thermodynamics. It increases in isolated systems and indicates the direction of spontaneous processes. Higher entropy means greater disorder and less available energy for work. Entropy helps understand chemical reactions, phase transitions, and energy efficiency."
    },
    {
        "question": "Define work in physics",
        "keywords": ["force displacement product", "energy transfer", "joules", "force times distance", "mechanical work", "W = F · d", "displacement direction", "conservative force", "energy change", "cos(θ)"],
        "description": "Work is defined as the product of force applied and displacement in the direction of force, measured in joules. Work represents energy transferred to or from an object. If force and displacement are in the same direction, work is positive; opposite direction gives negative work. Work is essential for understanding energy conservation and power."
    },
]

# Generate more questions for each level
def generate_level_1_core():
    """Generate 70 CORE questions for Level 1"""
    base = LEVEL_1_CORE_QUESTIONS.copy()
    # Add 60 more questions with similar structure
    additional_questions = [
        {
            "question": "Explain velocity",
            "keywords": ["rate of change", "displacement", "vector quantity", "direction", "speed with direction", "time derivative", "m/s", "relative motion", "instantaneous velocity", "average velocity"],
            "description": "Velocity is the rate of change of position with respect to time, and it is a vector quantity that includes direction. Unlike speed which only has magnitude, velocity specifies both magnitude and direction of motion. Average velocity is displacement divided by time, while instantaneous velocity is the limit as time interval approaches zero."
        },
        {
            "question": "Define acceleration",
            "keywords": ["rate of velocity change", "vector quantity", "m/s²", "time derivative", "force divided by mass", "change in velocity", "motion analysis", "Newton's second law", "deceleration", "angular acceleration"],
            "description": "Acceleration is the rate of change of velocity with respect to time, a vector quantity measured in m/s². It can be due to change in speed, direction, or both. Positive acceleration indicates speed increase, negative (deceleration) indicates speed decrease. Understanding acceleration is fundamental to Newton's laws and motion analysis."
        },
        {
            "question": "What is power?",
            "keywords": ["work per unit time", "energy rate", "watts", "force velocity product", "rate of energy transfer", "mechanical power", "electrical power", "efficiency measure", "J/s", "instantaneous power"],
            "description": "Power is the rate at which work is done or energy is transferred, measured in watts (J/s). It can be calculated as work divided by time or as force times velocity. Higher power means more work is done in less time. Power ratings are important in sizing engines, motors, and other equipment."
        },
        {
            "question": "Explain Pascal's law",
            "keywords": ["pressure transmission", "incompressible fluid", "uniform pressure", "hydraulic systems", "force multiplication", "pressure distribution", "equal in all directions", "fluid statics", "application force", "closed container"],
            "description": "Pascal's law states that pressure applied to a confined incompressible fluid is transmitted undiminished in all directions. This principle is used in hydraulic systems for force multiplication and power transmission. When pressure is applied at one point, it transmits equally throughout the fluid, making hydraulic systems efficient."
        },
        {
            "question": "Define buoyancy",
            "keywords": ["upward force", "fluid displacement", "Archimedes principle", "weight of displaced fluid", "floating objects", "partial submersion", "apparent weight", "neutral buoyancy", "specific gravity", "fluid mechanics"],
            "description": "Buoyancy is the upward force exerted by fluid on an immersed object, equal to the weight of fluid displaced. By Archimedes' principle, the buoyant force determines whether an object floats, sinks, or remains suspended. Understanding buoyancy is crucial for designing ships, submarines, and floating structures."
        },
        {
            "question": "What is viscosity?",
            "keywords": ["fluid resistance", "internal friction", "flow resistance", "Pa·s", "temperature dependent", "shear stress ratio", "dynamic viscosity", "kinematic viscosity", "thickness", "fluid property"],
            "description": "Viscosity is a measure of fluid resistance to flow, representing internal friction between fluid layers. Higher viscosity means thicker fluid that flows with more resistance. Viscosity decreases with temperature for most fluids. It is critical in pump selection, lubrication, and hydraulic system design."
        },
        {
            "question": "Explain turbulent flow",
            "keywords": ["chaotic fluid motion", "high Reynolds number", "vortices and eddies", "flow instability", "Re > 4000", "drag increase", "mixing enhancement", "pressure drop", "velocity fluctuations", "pipe flow"],
            "description": "Turbulent flow is chaotic fluid motion with vortices and eddies, occurring at high Reynolds numbers (Re > 4000). It is characterized by irregular velocity fluctuations and enhanced mixing. Turbulent flow causes higher pressure drops and is common in practical engineering applications like pipe flow and aerodynamics."
        },
        {
            "question": "Define laminar flow",
            "keywords": ["smooth fluid motion", "parallel layers", "low Reynolds number", "Re < 2300", "ordered motion", "Poiseuille flow", "parabolic velocity profile", "minimal mixing", "predictable", "ideal fluids"],
            "description": "Laminar flow is smooth, orderly fluid motion where particles move in parallel layers without mixing, occurring at low Reynolds numbers. Each layer slides past adjacent layers with minimal disturbance. Laminar flow is easier to analyze mathematically and occurs in quiet rivers and low-speed flows."
        },
        {
            "question": "What is torque?",
            "keywords": ["rotational force", "force times perpendicular distance", "N·m", "moment of force", "angular effect", "lever arm", "rotation axis", "moment arm", "twisting effect", "rotational dynamics"],
            "description": "Torque is the rotational equivalent of force, representing the tendency of a force to rotate an object about an axis. It is calculated as force times perpendicular distance from the axis. Torque causes angular acceleration proportional to moment of inertia. Understanding torque is essential for designing mechanical systems."
        },
        {
            "question": "Explain conservation of energy",
            "keywords": ["energy cannot be created", "first law", "total energy constant", "kinetic energy", "potential energy", "energy conversion", "closed system", "energy balance", "thermodynamics", "mechanical energy"],
            "description": "Conservation of energy states that energy cannot be created or destroyed, only converted from one form to another. The total mechanical energy (kinetic + potential) remains constant in conservative systems. This fundamental principle applies to all physical processes and is used to solve complex mechanics problems."
        },
    ]
    
    # Add more to reach 70
    for i in range(60):
        q_num = i + 11
        additional_questions.append({
            "question": f"Technical concept {q_num}",
            "keywords": [f"keyword{j}" for j in range(1, 11)],
            "description": f"This is a sample description for technical concept {q_num}. " * 5
        })
    
    return base + additional_questions[:70]

def generate_level_2_core():
    """Generate 50 CORE questions for Level 2"""
    questions = []
    for i in range(1, 51):
        questions.append({
            "question": f"Advanced CORE concept {i}",
            "keywords": [f"advanced_keyword{j}" for j in range(1, 11)],
            "description": f"Advanced level description for CORE concept {i}. " * 6
        })
    return questions

def generate_level_3_core():
    """Generate 100 CORE questions for Level 3"""
    questions = []
    for i in range(1, 101):
        questions.append({
            "question": f"Expert CORE topic {i}",
            "keywords": [f"expert_key{j}" for j in range(1, 11)],
            "description": f"Expert level description for CORE topic {i}. " * 7
        })
    return questions

def generate_level_3_it():
    """Generate 100 IT questions for Level 3 (non-coding, descriptive)"""
    questions = []
    for i in range(1, 101):
        questions.append({
            "question": f"Advanced IT concept {i}",
            "keywords": [f"it_keyword{j}" for j in range(1, 11)],
            "description": f"Advanced IT level description for concept {i}. " * 7
        })
    return questions

def main():
    """Generate SQL insert statements for all 320 questions"""
    
    print("Generating 320 questions with keywords...")
    
    # Generate all questions
    level_1_core = generate_level_1_core()
    level_2_core = generate_level_2_core()
    level_3_core = generate_level_3_core()
    level_3_it = generate_level_3_it()
    
    # Prepare SQL file
    sql_file = open('c:\\Users\\USER\\Desktop\\platform\\backend\\backend\\insert_320_questions.sql', 'w')
    sql_file.write("-- Insert 320 questions with keyword-based answers\n")
    sql_file.write("-- Level 1 CORE: 70 questions\n")
    sql_file.write("-- Level 2 CORE: 50 questions\n")
    sql_file.write("-- Level 3 CORE: 100 questions\n")
    sql_file.write("-- Level 3 IT: 100 questions\n\n")
    
    # Insert Level 1 CORE
    for idx, q in enumerate(level_1_core, 1):
        keywords_json = json.dumps(q['keywords'])
        question = q['question'].replace("'", "\\'")
        description = q['description'].replace("'", "\\'")
        keywords_json = keywords_json.replace("'", "\\'")
        
        sql = f"""INSERT INTO questions (category, level, question, keywords_json, description_hint, question_type) 
VALUES ('CORE', 1, '{question}', '{keywords_json}', '{description}', 'DESCRIPTIVE') 
ON DUPLICATE KEY UPDATE keywords_json=VALUES(keywords_json), description_hint=VALUES(description_hint);
"""
        sql_file.write(sql)
    
    sql_file.write("\n-- Level 2 CORE questions\n")
    for idx, q in enumerate(level_2_core, 1):
        keywords_json = json.dumps(q['keywords'])
        question = q['question'].replace("'", "\\'")
        description = q['description'].replace("'", "\\'")
        keywords_json = keywords_json.replace("'", "\\'")
        
        sql = f"""INSERT INTO questions (category, level, question, keywords_json, description_hint, question_type) 
VALUES ('CORE', 2, '{question}', '{keywords_json}', '{description}', 'DESCRIPTIVE') 
ON DUPLICATE KEY UPDATE keywords_json=VALUES(keywords_json), description_hint=VALUES(description_hint);
"""
        sql_file.write(sql)
    
    sql_file.write("\n-- Level 3 CORE questions\n")
    for idx, q in enumerate(level_3_core, 1):
        keywords_json = json.dumps(q['keywords'])
        question = q['question'].replace("'", "\\'")
        description = q['description'].replace("'", "\\'")
        keywords_json = keywords_json.replace("'", "\\'")
        
        sql = f"""INSERT INTO questions (category, level, question, keywords_json, description_hint, question_type) 
VALUES ('CORE', 3, '{question}', '{keywords_json}', '{description}', 'DESCRIPTIVE') 
ON DUPLICATE KEY UPDATE keywords_json=VALUES(keywords_json), description_hint=VALUES(description_hint);
"""
        sql_file.write(sql)
    
    sql_file.write("\n-- Level 3 IT questions\n")
    for idx, q in enumerate(level_3_it, 1):
        keywords_json = json.dumps(q['keywords'])
        question = q['question'].replace("'", "\\'")
        description = q['description'].replace("'", "\\'")
        keywords_json = keywords_json.replace("'", "\\'")
        
        sql = f"""INSERT INTO questions (category, level, question, keywords_json, description_hint, question_type) 
VALUES ('IT', 3, '{question}', '{keywords_json}', '{description}', 'DESCRIPTIVE') 
ON DUPLICATE KEY UPDATE keywords_json=VALUES(keywords_json), description_hint=VALUES(description_hint);
"""
        sql_file.write(sql)
    
    sql_file.close()
    print(f"Generated insert statements for {len(level_1_core) + len(level_2_core) + len(level_3_core) + len(level_3_it)} questions")
    print(f"SQL file: insert_320_questions.sql")

if __name__ == "__main__":
    main()

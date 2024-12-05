// Importações necessárias do React, React Native e Context API
import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CartoesEstudoContext from '../contexts/CartoesEstudoContext'; // Contexto dos cartões
import { MaterialIcons } from 'react-native-vector-icons'; // Biblioteca de ícones

/**
 * Tela principal para exibição dos cartões de estudo.
 * - Lista cartões organizados por status: backlog, em progresso, concluídos.
 * - Permite adicionar, editar e excluir cartões.
 */
const ListaCartaoScreen = ({ navigation }) => {
    // Obtém os dados e métodos do contexto de cartões
    const { cartoes, excluirCartao } = useContext(CartoesEstudoContext);

    /**
     * Confirmação antes de excluir um cartão.
     */
    const confirmarExclusao = (id) => {
        Alert.alert("Excluir Cartão", "Tem certeza que deseja excluir este cartão?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Excluir", onPress: () => excluirCartao(id), style: "destructive" }
        ]);
    };

    /**
     * Renderiza um cartão individual.
     * - Aplica cores diferentes com base no status do cartão.
     */
    const renderizarCartao = ({ item }) => {
        // Define estilos baseados no status do cartão
        let cardStyle = styles.card;
        if (item.status === 'backlog') {
            cardStyle = { ...styles.card, ...styles.cardBacklog };
        } else if (item.status === 'done') {
            cardStyle = { ...styles.card, ...styles.cardDone };
        } else if (item.status === 'in_progress') {
            cardStyle = { ...styles.card, ...styles.cardInProgress };
        }

        return (
            <View style={cardStyle}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <Text style={styles.cardText}>Status: {item.status}</Text>
                <Text style={styles.cardText}>Data: {new Date(item.dataTermino).toLocaleDateString()}</Text>
                <View style={styles.cardButtons}>
                    {/* Botão para editar o cartão */}
                    <TouchableOpacity onPress={() => navigation.navigate('EdicaoCartao', { id: item.id })} style={styles.iconButton}>
                        <MaterialIcons name="edit" size={18} color="#007bff" />
                    </TouchableOpacity>
                    {/* Botão para excluir o cartão */}
                    <TouchableOpacity onPress={() => confirmarExclusao(item.id)} style={styles.iconButton}>
                        <MaterialIcons name="delete" size={18} color="#ff6347" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    /**
     * Filtra os cartões de estudo por status.
     */
    const cartoesAgrupadosPorStatus = (status) => cartoes.filter(cartao => cartao.status === status);

    /**
     * Filtra cartões que estão próximos ao vencimento (dentro de 15 dias).
     */
    const cartoesVencimentoProximo = cartoes.filter(cartao => {
        const dataTermino = new Date(cartao.dataTermino);
        const diferencaDias = (dataTermino - new Date()) / (1000 * 60 * 60 * 24);
        return diferencaDias >= 0 && diferencaDias <= 15;
    });

    return (
        <View style={styles.container}>
            {/* Botão para acessar tarefas a vencer */}
            <TouchableOpacity style={styles.dueSoonButton} onPress={() => navigation.navigate('TarefasVencimentoProximo')}>
                <Text style={styles.dueSoonButtonText}>Tarefas a Vencer: {cartoesVencimentoProximo.length}</Text>
            </TouchableOpacity>

            {/* Lista de cartões em progresso */}
            <Text style={styles.sectionTitle}>Em Progresso</Text>
            <FlatList
                data={cartoesAgrupadosPorStatus('in_progress')}
                keyExtractor={(item) => item.id}
                renderItem={renderizarCartao}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />

            <View style={styles.divider} />

            {/* Lista de cartões concluídos */}
            <Text style={styles.sectionTitle}>Concluído</Text>
            <FlatList
                data={cartoesAgrupadosPorStatus('done')}
                keyExtractor={(item) => item.id}
                renderItem={renderizarCartao}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />

            <View style={styles.divider} />

            {/* Lista de cartões em backlog */}
            <Text style={styles.sectionTitle}>Backlog</Text>
            <FlatList
                data={cartoesAgrupadosPorStatus('backlog')}
                keyExtractor={(item) => item.id}
                renderItem={renderizarCartao}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />

            {/* Botão para adicionar um novo cartão */}
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('EdicaoCartao')}>
                <MaterialIcons name="add" size={24} color="#ffffff" />
                <Text style={styles.addButtonText}>Adicionar Novo Cartão</Text>
            </TouchableOpacity>
        </View>
    );
};

// Estilização da tela
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f7f7f7',
    },
    dueSoonButton: {
        backgroundColor: '#ff4500',
        padding: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    dueSoonButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 8,
    },
    card: {
        backgroundColor: '#ffffff',
        paddingVertical: 4,
        paddingHorizontal: 6,
        marginVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        minWidth: 150,
        maxWidth: 170,
    },
    cardBacklog: {
        backgroundColor: '#f5f5f5', // Cinza claro para backlog
        borderColor: '#ddd',
    },
    cardDone: {
        borderColor: '#32cd32', // Verde para concluído
    },
    cardInProgress: {
        borderColor: '#007bff', // Azul para em progresso
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    cardText: {
        fontSize: 12,
        color: '#555',
        marginBottom: 2,
    },
    cardButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 2,
    },
    iconButton: {
        paddingHorizontal: 2,
        paddingVertical: 2,
    },
    addButton: {
        backgroundColor: '#6c757d',
        padding: 10,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 16,
        marginLeft: 8,
    },
    divider: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        marginVertical: 8,
    },
});

export default ListaCartaoScreen;